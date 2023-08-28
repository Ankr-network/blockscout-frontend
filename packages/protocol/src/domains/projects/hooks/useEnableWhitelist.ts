/* eslint-disable max-lines-per-function */
import { useCallback, useMemo } from 'react';
import { AccountErrorCode } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useLazyUpdateWhitelistModeQuery } from 'domains/projects/actions/updateWhitelistMode';
import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { NewProjectStep, WhiteListItem } from 'domains/projects/types';
import { ChainID } from 'domains/chains/types';
import { useLazyUpdateJwtTokenFreezeStatusQuery } from 'domains/jwtToken/action/updateJwtTokenFreezeStatus';
import { checkChainsWithExtensionsAndGetChainId } from 'domains/projects/utils/checkChainsWithExtensionsAndGetChainId';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { getAxiosAccountErrorCode } from 'store/utils/getAxiosAccountErrorCode';
import { useAppDispatch } from 'store/useAppDispatch';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { isAxiosAccountError } from 'store/utils/isAxiosAccountError';

import { AddToWhitelistFormData, NewProjectType } from '../store';
import { addToWhitelist as addToWhitelistAction } from '../actions/addToWhitelist';
import { newProjectIntlRoot } from '../const';

interface IParamsForWhitelist {
  chainId: ChainID;
  contractAddress: string;
  type?: WhiteListItem;
}

const getParamsForWhitelistRequests = (
  whitelistItems: AddToWhitelistFormData[],
): IParamsForWhitelist[] =>
  whitelistItems
    .map(item =>
      item.chains.map(chainItem => ({
        chainId: chainItem,
        contractAddress: item.value,
        type: item.type,
      })),
    )
    .flat();

const getProjectValues = (project: NewProjectType) => {
  const userEndpointToken =
    project[NewProjectStep.Chain]?.userEndpointToken || '';
  const whitelistItems =
    project[NewProjectStep.Whitelist]?.whitelistItems || [];

  const {
    selectedMainnetIds = [],
    selectedTestnetIds = [],
    selectedDevnetIds = [],
  } = project[NewProjectStep.Chain] || {};

  const chainIds = [
    ...selectedMainnetIds,
    ...selectedTestnetIds,
    ...selectedDevnetIds,
  ];

  return {
    userEndpointToken,
    whitelistItems,
    chainIds,
  };
};

export const useEnableWhitelist = () => {
  const dispatch = useAppDispatch();

  const [addToWhitelist, { isLoading: isAddToWhitelistLoading }] =
    useQueryEndpoint(addToWhitelistAction);
  const [updateWhitelistMode, { isLoading: isWhitelistModeLoading }] =
    useLazyUpdateWhitelistModeQuery();
  const [
    updateJwtTokenFreezeStatus,
    { isLoading: isJwtTokenFreezeStatusLoading },
  ] = useLazyUpdateJwtTokenFreezeStatusQuery();

  const { project = {}, handleResetConfig } = useProjectConfig();

  const { userEndpointToken, whitelistItems } = useMemo(
    () => getProjectValues(project),
    [project],
  );

  const { selectedGroupAddress: groupAddress } = useSelectedUserGroup();

  const paramsForWhitelistRequests = useMemo(
    () => getParamsForWhitelistRequests(whitelistItems),
    [whitelistItems],
  );

  const handleAddAddressToWhitelist = useCallback(async () => {
    let isErrorOccured = false;
    let shouldRedirectToStripe = false;

    // eslint-disable-next-line no-restricted-syntax
    for (const params of paramsForWhitelistRequests) {
      // eslint-disable-next-line no-await-in-loop
      const { error } = await addToWhitelist({
        params: {
          userEndpointToken,
          chainId: checkChainsWithExtensionsAndGetChainId(params.chainId),
          contractAddress: params.contractAddress,
          group: groupAddress,
          type: params.type,
        },
      });

      if (error) {
        isErrorOccured = true;

        if (isAxiosAccountError(error)) {
          const errorCode = getAxiosAccountErrorCode(error);
          const isInsufficientBalanceError =
            errorCode === AccountErrorCode.InsufficientBalance;

          if (isInsufficientBalanceError) {
            shouldRedirectToStripe = true;
          }
        } else {
          dispatch(
            NotificationActions.showNotification({
              message: t(
                `${newProjectIntlRoot}.checkout-step.error-message.can-not-add-to-whitelist`,
                {
                  contractAddress: params.contractAddress,
                  userEndpointToken,
                },
              ),
              severity: 'error',
            }),
          );
        }
      }
    }

    return {
      isErrorOccured,
      shouldRedirectToStripe,
    };
  }, [
    groupAddress,
    paramsForWhitelistRequests,
    userEndpointToken,
    addToWhitelist,
    dispatch,
  ]);

  const handleUpdateWhitelistMode = useCallback(async () => {
    const { error } = await updateWhitelistMode({
      params: {
        userEndpointToken,
        prohibitByDefault: false,
        groupAddress,
      },
    });

    return error;
  }, [updateWhitelistMode, userEndpointToken, groupAddress]);

  const handleUpdateJwtTokenFreezeStatus = useCallback(async () => {
    const { error } = await updateJwtTokenFreezeStatus({
      token: userEndpointToken,
      group: groupAddress,
      freeze: false,
    });

    return error;
  }, [updateJwtTokenFreezeStatus, userEndpointToken, groupAddress]);

  const handleEnableWhitelist = useCallback(
    async (shouldReset = true) => {
      const { isErrorOccured, shouldRedirectToStripe } =
        await handleAddAddressToWhitelist();

      if (isErrorOccured)
        return {
          isSuccess: false,
          shouldRedirectToStripe,
        };

      const updateWhitelistError = await handleUpdateWhitelistMode();

      if (updateWhitelistError)
        return {
          isSuccess: false,
          shouldRedirectToStripe: true,
        };

      const updateJwtTokenFreezeStatusError =
        await handleUpdateJwtTokenFreezeStatus();

      if (updateJwtTokenFreezeStatusError)
        return {
          isSuccess: false,
          shouldRedirectToStripe: true,
        };

      if (shouldReset) handleResetConfig();

      return {
        isSuccess: true,
        shouldRedirectToStripe: false,
      };
    },
    [
      handleAddAddressToWhitelist,
      handleResetConfig,
      handleUpdateWhitelistMode,
      handleUpdateJwtTokenFreezeStatus,
    ],
  );

  return {
    handleEnableWhitelist,
    handleResetConfig,
    isLoading:
      isAddToWhitelistLoading ||
      isWhitelistModeLoading ||
      isJwtTokenFreezeStatusLoading,
  };
};
