import { MenuItemProps } from '@mui/material';
import { UserEndpointTokenMode, WhitelistItem } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { canAddItemsToWhitelist } from 'domains/projects/utils/canAddItemsToWhitelist';
import { flatChains } from 'modules/chains/utils/flatChains';
import { isEVMBased } from 'modules/chains/utils/isEVMBased';
import { useProjectChainsContext } from 'domains/projects/screens/Project/hooks/useProjectChainsContext';
import { whitelistTypeLabelMap } from 'domains/projects/const';

type AddableWhitelistType = Exclude<UserEndpointTokenMode, 'all'>;

const addableWhitelistTypes: AddableWhitelistType[] = [
  UserEndpointTokenMode.REFERER,
  UserEndpointTokenMode.IP,
  UserEndpointTokenMode.ADDRESS,
];

export interface UseWhitelistMenuItemsParams {
  setAddDomainContent: () => void;
  setAddIPContent: () => void;
  setAddSmartContractContent: () => void;
  whitelist: WhitelistItem[];
}

export const useWhitelistMenuItems = ({
  setAddDomainContent,
  setAddIPContent,
  setAddSmartContractContent,
  whitelist,
}: UseWhitelistMenuItemsParams) => {
  const { projectChains } = useProjectChainsContext();

  const {
    isAddingDomainAllowed,
    isAddingIPAllowed,
    isAddingSmartContractAllowed,
    premissionsMap,
  } = useMemo(() => {
    const hasEvmChain = flatChains(projectChains).some(({ id }) =>
      isEVMBased(id),
    );

    return canAddItemsToWhitelist({ hasEvmChain, whitelist });
  }, [projectChains, whitelist]);

  const clickHandlersMap = useMemo(
    (): Record<AddableWhitelistType, () => void> => ({
      [UserEndpointTokenMode.ADDRESS]: setAddSmartContractContent,
      [UserEndpointTokenMode.IP]: setAddIPContent,
      [UserEndpointTokenMode.REFERER]: setAddDomainContent,
    }),
    [setAddDomainContent, setAddIPContent, setAddSmartContractContent],
  );

  const items = useMemo(
    () =>
      addableWhitelistTypes.map<MenuItemProps>(type => ({
        children: t(whitelistTypeLabelMap[type], { plurals: 1 }),
        disabled: !premissionsMap[type],
        onClick: clickHandlersMap[type],
      })),
    [clickHandlersMap, premissionsMap],
  );

  const isDisabled =
    !isAddingDomainAllowed &&
    !isAddingIPAllowed &&
    !isAddingSmartContractAllowed;

  return { isDisabled, items };
};
