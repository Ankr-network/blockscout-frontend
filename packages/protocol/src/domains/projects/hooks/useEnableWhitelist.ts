import { useCallback, useMemo } from 'react';

import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useLazyUpdateWhitelistModeQuery } from 'domains/projects/actions/updateWhitelistMode';
import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { NewProjectStep, WhiteListItem } from 'domains/projects/types';
import { ChainID } from 'domains/chains/types';
import { useLazyUpdateJwtTokenFreezeStatusQuery } from 'domains/jwtToken/action/updateJwtTokenFreezeStatus';
import { checkChainsWithExtensionsAndGetChainId } from 'domains/projects/utils/checkChainsWithExtensionsAndGetChainId';

import { AddToWhitelistFormData, NewProjectType } from '../store';
import { useLazyAddToWhitelistQuery } from '../actions/addToWhitelist';

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
    project[NewProjectStep.Whitelist]?.userEndpointToken || '';
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
  const [addToWhitelist, { isLoading: isAddToWhitelistLoading }] =
    useLazyAddToWhitelistQuery();
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
      }
    }

    return isErrorOccured;
  }, [
    addToWhitelist,
    groupAddress,
    paramsForWhitelistRequests,
    userEndpointToken,
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
      const error = await handleAddAddressToWhitelist();

      if (error) return false;

      const updateWhitelistError = await handleUpdateWhitelistMode();

      if (updateWhitelistError) return false;

      const updateJwtTokenFreezeStatusError =
        await handleUpdateJwtTokenFreezeStatus();

      if (updateJwtTokenFreezeStatusError) return false;

      if (shouldReset) handleResetConfig();

      return true;
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
