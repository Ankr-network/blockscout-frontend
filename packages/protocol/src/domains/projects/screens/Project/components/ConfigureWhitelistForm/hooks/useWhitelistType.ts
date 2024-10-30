import { UserEndpointTokenMode } from 'multirpc-sdk';
import { useMemo } from 'react';

import { useTabs } from 'modules/common/hooks/useTabs';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { getWhitelistTypeTabs } from '../utils/getWhitelistTypeTabs';

export const useWhitelistType = () => {
  const { hasPremium } = useAuth();

  const tabs = useMemo(() => getWhitelistTypeTabs(hasPremium), [hasPremium]);

  const [whitelistTypeTabs, selectedWhitelistTypeTab, selectWhitelistTypeTab] =
    useTabs<UserEndpointTokenMode>({ tabs });

  const whitelistType =
    selectedWhitelistTypeTab?.id || UserEndpointTokenMode.ALL;

  return {
    selectWhitelistTypeTab,
    selectedWhitelistTypeTab,
    whitelistType,
    whitelistTypeTabs,
  };
};
