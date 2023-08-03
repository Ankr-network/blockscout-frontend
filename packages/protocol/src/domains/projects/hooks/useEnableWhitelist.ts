import { useCallback, useMemo } from 'react';
import { t } from '@ankr.com/common';

import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useLazyUpdateWhitelistModeQuery } from 'domains/projects/actions/updateWhitelistMode';
import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { NewProjectStep, WhiteListItem } from 'domains/projects/types';
import { useAppDispatch } from 'store/useAppDispatch';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { ChainID } from 'domains/chains/types';
import { checkChainsWithExtensionsAndGetChainId } from 'domains/projects/utils/checkChainsWithExtensionsAndGetChainId';

import { AddToWhitelistFormData, NewProjectType } from '../store';
import { useLazyAddToWhitelistQuery } from '../actions/addToWhitelist';
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
  const dispatch = useAppDispatch();

  const [addToWhitelist, { isLoading: isAddToWhitelistLoading }] =
    useLazyAddToWhitelistQuery();
  const [updateWhitelistMode, { isLoading: isWhitelistModeLoading }] =
    useLazyUpdateWhitelistModeQuery();
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
      try {
        // eslint-disable-next-line no-await-in-loop
        await addToWhitelist({
          params: {
            userEndpointToken,
            chainId: checkChainsWithExtensionsAndGetChainId(params.chainId),
            contractAddress: params.contractAddress,
            group: groupAddress,
            type: params.type,
          },
        });
      } catch (e) {
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
    addToWhitelist,
    dispatch,
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
    isLoading: isAddToWhitelistLoading || isWhitelistModeLoading,
    handleResetConfig,
  };
};
