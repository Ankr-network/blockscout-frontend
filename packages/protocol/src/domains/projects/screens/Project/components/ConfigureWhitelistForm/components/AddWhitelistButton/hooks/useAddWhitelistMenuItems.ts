import { MenuItemProps } from '@mui/material';
import { UserEndpointTokenMode, WhitelistItem } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { canAddItemsToWhitelist } from 'domains/projects/utils/canAddItemsToWhitelist';
import { flatChains } from 'modules/chains/utils/flatChains';
import { isEVMBased } from 'modules/chains/utils/isEVMBased';
import { useProjectChainsContext } from 'domains/projects/screens/Project/hooks/useProjectChainsContext';
import { whitelistTypeLabelMap } from 'domains/projects/const';
import { useAuth } from 'domains/auth/hooks/useAuth';

type AddableWhitelistType = Exclude<UserEndpointTokenMode, 'all'>;

const freemiumAddableWhitelistTypes: AddableWhitelistType[] = [
  UserEndpointTokenMode.REFERER,
  UserEndpointTokenMode.IP,
];

const premiumAddableWhitelistTypes: AddableWhitelistType[] = [
  ...freemiumAddableWhitelistTypes,
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

  const { hasPremium } = useAuth();

  const items = useMemo(() => {
    let addableWhitelistTypes = freemiumAddableWhitelistTypes;

    if (hasPremium) {
      addableWhitelistTypes = premiumAddableWhitelistTypes;
    }

    return addableWhitelistTypes.map<MenuItemProps>(type => ({
      children: t(whitelistTypeLabelMap[type], { plurals: 1 }),
      disabled: !premissionsMap[type],
      onClick: clickHandlersMap[type],
    }));
  }, [clickHandlersMap, hasPremium, premissionsMap]);

  const isDisabled =
    !isAddingDomainAllowed &&
    !isAddingIPAllowed &&
    !isAddingSmartContractAllowed;

  return { isDisabled, items };
};
