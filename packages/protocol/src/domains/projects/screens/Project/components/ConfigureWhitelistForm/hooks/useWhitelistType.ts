import { UserEndpointTokenMode } from 'multirpc-sdk';

import { useTabs } from 'modules/common/hooks/useTabs';

import { getWhitelistTypeTabs } from '../utils/getWhitelistTypeTabs';

const tabs = getWhitelistTypeTabs();

export const useWhitelistType = () => {
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
