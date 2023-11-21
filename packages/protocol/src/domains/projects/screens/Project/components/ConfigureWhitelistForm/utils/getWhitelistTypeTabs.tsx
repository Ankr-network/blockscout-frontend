import { UserEndpointTokenMode } from 'multirpc-sdk';

import { Tab } from 'modules/common/hooks/useTabs';

import { WhitelistTypeTab } from '../components/WhitelistTypeTab';

const whitelistsTypes: UserEndpointTokenMode[] = [
  UserEndpointTokenMode.ALL,
  UserEndpointTokenMode.REFERER,
  UserEndpointTokenMode.IP,
  UserEndpointTokenMode.ADDRESS,
];

export const getWhitelistTypeTabs = () =>
  whitelistsTypes.map<Tab<UserEndpointTokenMode>>(type => ({
    id: type,
    title: (isSelected: boolean) => (
      <WhitelistTypeTab type={type} isSelected={isSelected} />
    ),
  }));
