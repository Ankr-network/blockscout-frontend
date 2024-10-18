import { UserEndpointTokenMode } from 'multirpc-sdk';

import { Tab } from 'modules/common/hooks/useTabs';

import { WhitelistTypeTab } from '../components/WhitelistTypeTab';

const freemiumWhitelistsTypes: UserEndpointTokenMode[] = [
  UserEndpointTokenMode.ALL,
  UserEndpointTokenMode.REFERER,
  UserEndpointTokenMode.IP,
];

const premiumWhitelistsTypes: UserEndpointTokenMode[] = [
  ...freemiumWhitelistsTypes,
  UserEndpointTokenMode.ADDRESS,
];

export const getWhitelistTypeTabs = (hasPremium?: boolean) =>
  (hasPremium ? premiumWhitelistsTypes : freemiumWhitelistsTypes).map<
    Tab<UserEndpointTokenMode>
  >(type => ({
    id: type,
    title: (isSelected: boolean) => (
      <WhitelistTypeTab type={type} isSelected={isSelected} />
    ),
  }));
