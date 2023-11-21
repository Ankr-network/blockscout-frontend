import { UserEndpointTokenMode, WhitelistItem } from 'multirpc-sdk';

export const filterWhitelistByType = (
  whitelistType: UserEndpointTokenMode,
  whitelist: WhitelistItem[] = [],
) => {
  if (whitelistType !== UserEndpointTokenMode.ALL) {
    return whitelist.filter(({ type }) => type === whitelistType);
  }

  return whitelist;
};
