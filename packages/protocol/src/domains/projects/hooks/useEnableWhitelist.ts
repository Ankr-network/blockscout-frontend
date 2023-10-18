/* eslint-disable max-lines-per-function */
import { useCallback, useMemo } from 'react';
import { t } from '@ankr.com/common';

import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useLazyUpdateWhitelistModeQuery } from 'domains/projects/actions/updateWhitelistMode';
import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { NewProjectStep, WhiteListItem } from 'domains/projects/types';
import { ChainID } from 'domains/chains/types';
import { useLazyUpdateJwtTokenFreezeStatusQuery } from 'domains/jwtToken/action/updateJwtTokenFreezeStatus';
import { checkChainsWithExtensionsAndGetChainId } from 'domains/projects/utils/checkChainsWithExtensionsAndGetChainId';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useAppDispatch } from 'store/useAppDispatch';
import { NotificationActions } from 'domains/notification/store/NotificationActions';

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
    project[NewProjectStep.General]?.userEndpointToken || '';
  const whitelistItems =
    project[NewProjectStep.Whitelist]?.whitelistItems || [];

  const {
    selectedMainnetIds = [],
    selectedTestnetIds = [],
    selectedDevnetIds = [],
  } = project[NewProjectStep.Chains] || {};

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

    return isErrorOccured;
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
      const isErrorOccured = await handleAddAddressToWhitelist();

      if (isErrorOccured)
        return {
          isSuccess: false,
        };

      const updateWhitelistError = await handleUpdateWhitelistMode();

      if (updateWhitelistError)
        return {
          isSuccess: false,
        };

      const updateJwtTokenFreezeStatusError =
        await handleUpdateJwtTokenFreezeStatus();

      if (updateJwtTokenFreezeStatusError)
        return {
          isSuccess: false,
        };

      if (shouldReset) handleResetConfig();

      return {
        isSuccess: true,
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
    userEndpointToken,
  };
};
