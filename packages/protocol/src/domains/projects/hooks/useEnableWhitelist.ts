import { useCallback, useMemo } from 'react';

import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useLazyAddAddressToWhitelistQuery } from 'domains/projects/actions/addAddressToWhitelist';
import { useLazyUpdateWhitelistModeQuery } from 'domains/projects/actions/updateWhitelistMode';
import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { NewProjectStep } from 'domains/projects/types';
import { NewProjectType } from '../store';
import { checkPrivateChainsAndGetChainId } from 'domains/chains/screens/ChainItem/components/UsageDataSection/const';
import { ChainID } from 'domains/chains/types';

const getProjectValues = (project: NewProjectType) => {
  const userEndpointToken =
    project[NewProjectStep.Whitelist]?.userEndpointToken || '';
  const contractAddress =
    project[NewProjectStep.Whitelist]?.contractAddress || '';
  const subChainId = project[NewProjectStep.Chain]?.subChainId || '';

  return {
    userEndpointToken,
    contractAddress,
    subChainId,
  };
};

export const useEnableWhitelist = () => {
  const [addAddressToWhitelist, { isLoading: isAddAddressToWhitelistLoading }] =
    useLazyAddAddressToWhitelistQuery();
  const [updateWhitelistMode, { isLoading: isWhitelistModeLoading }] =
    useLazyUpdateWhitelistModeQuery();
  const { project = {}, handleResetConfig } = useProjectConfig();

  const { userEndpointToken, subChainId, contractAddress } = useMemo(
    () => getProjectValues(project),
    [project],
  );

  const { selectedGroupAddress: groupAddress } = useSelectedUserGroup();

  const handleAddAddressToWhitelist = useCallback(async () => {
    const { error } = await addAddressToWhitelist({
      params: {
        userEndpointToken,
        chainId: checkPrivateChainsAndGetChainId(subChainId as ChainID),
        contractAddress,
        group: groupAddress,
      },
    });

    return error;
  }, [
    addAddressToWhitelist,
    contractAddress,
    groupAddress,
    subChainId,
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

  const handleEnableWhitelist = useCallback(
    async (shouldReset = true) => {
      const error = await handleAddAddressToWhitelist();

      if (error) return false;

      const updateWhitelistError = await handleUpdateWhitelistMode();

      if (updateWhitelistError) return false;

      if (shouldReset) handleResetConfig();

      return true;
    },
    [handleAddAddressToWhitelist, handleResetConfig, handleUpdateWhitelistMode],
  );

  return {
    handleAddAddressToWhitelist,
    handleUpdateWhitelistMode,
    handleEnableWhitelist,
    isLoading: isAddAddressToWhitelistLoading || isWhitelistModeLoading,
    handleResetConfig,
  };
};
