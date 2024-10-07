/* eslint-disable max-lines-per-function */
import { UserEndpointTokenMode } from 'multirpc-sdk';
import { useCallback, useMemo } from 'react';
import { t } from '@ankr.com/common';
import { ChainID } from '@ankr.com/chains-list';

import { NewProjectStep } from 'domains/projects/types';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { checkChainsWithExtensionsAndGetChainId } from 'domains/projects/utils/checkChainsWithExtensionsAndGetChainId';
import { isMutationSuccessful } from 'modules/common/utils/isMutationSuccessful';
import { useAppDispatch } from 'store/useAppDispatch';
import { useLazyUpdateWhitelistModeQuery } from 'domains/projects/actions/updateWhitelistMode';
import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useUpdateJwtTokenFreezeStatusMutation } from 'domains/jwtToken/action/updateJwtTokenFreezeStatus';

import { AddToWhitelistFormData, NewProjectType } from '../store';
import {
  CACHE_KEY_ENABLE_WHITELISTS,
  useAddBlockchainsToWhitelistMutation,
} from '../actions/addBlockchainsToWhitelist';
import { newProjectIntlRoot } from '../const';
import { useAddToWhitelistMutation } from '../actions/addToWhitelist';

interface IParamsForWhitelist {
  chainId: ChainID;
  contractAddress: string;
  type?: UserEndpointTokenMode;
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
    isSelectedAll = false,
    selectedBeaconMainnetIds = [],
    selectedBeaconTestnetIds = [],
    selectedDevnetIds = [],
    selectedMainnetIds = [],
    selectedOpnodeMainnetIds = [],
    selectedOpnodeTestnetIds = [],
    selectedTestnetIds = [],
  } = project[NewProjectStep.Chains] || {};

  const chainIds = [
    ...selectedMainnetIds,
    ...selectedTestnetIds,
    ...selectedDevnetIds,
    ...selectedOpnodeMainnetIds,
    ...selectedOpnodeTestnetIds,
    ...selectedBeaconMainnetIds,
    ...selectedBeaconTestnetIds,
  ];

  return {
    userEndpointToken,
    whitelistItems,
    chainIds,
    isSelectedAll,
  };
};

export const useEnableWhitelist = () => {
  const dispatch = useAppDispatch();

  const [addToWhitelist, { isLoading: isAddToWhitelistLoading }] =
    useAddToWhitelistMutation();

  const [
    addBlockchainsToWhitelistRequest,
    { isLoading: isAddBlockchainsToWhitelistLoading },
  ] = useAddBlockchainsToWhitelistMutation({
    fixedCacheKey: CACHE_KEY_ENABLE_WHITELISTS,
  });

  const [updateWhitelistMode, { isLoading: isWhitelistModeLoading }] =
    useLazyUpdateWhitelistModeQuery();

  const [
    updateJwtTokenFreezeStatus,
    { isLoading: isJwtTokenFreezeStatusLoading },
  ] = useUpdateJwtTokenFreezeStatusMutation();

  const { handleResetConfig, project = {} } = useProjectConfig();

  const { chainIds, isSelectedAll, userEndpointToken, whitelistItems } =
    useMemo(() => getProjectValues(project), [project]);

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
      const response = await addToWhitelist({
        params: {
          userEndpointToken,
          chainId: checkChainsWithExtensionsAndGetChainId(params.chainId),
          contractAddress: params.contractAddress,
          group: groupAddress,
          type: params.type,
        },
      });

      if (!isMutationSuccessful(response)) {
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

    const mappedChainIds = (chainIds as ChainID[]).map(
      checkChainsWithExtensionsAndGetChainId,
    );

    const response = await addBlockchainsToWhitelistRequest({
      params: {
        userEndpointToken,
        blockchains: isSelectedAll ? [] : mappedChainIds,
        group: groupAddress,
      },
    });

    // response is expected to be one of the types data | error.
    // @ts-ignore
    if (response.error) {
      isErrorOccured = true;
    }

    return isErrorOccured;
  }, [
    groupAddress,
    paramsForWhitelistRequests,
    userEndpointToken,
    isSelectedAll,
    chainIds,
    addToWhitelist,
    addBlockchainsToWhitelistRequest,
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
    const response = await updateJwtTokenFreezeStatus({
      token: userEndpointToken,
      group: groupAddress,
      freeze: false,
    });

    return isMutationSuccessful(response) ? undefined : response.error;
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
      isAddBlockchainsToWhitelistLoading ||
      isAddToWhitelistLoading ||
      isWhitelistModeLoading ||
      isJwtTokenFreezeStatusLoading,
    userEndpointToken,
  };
};
