import { UserEndpointTokenMode, WhitelistItem } from 'multirpc-sdk';

import { getWhitelistItemsLimit } from 'domains/projects/utils/getWhitelistItemsLimit';

const { ADDRESS, IP, REFERER } = UserEndpointTokenMode;

const getCountByType = (
  type: UserEndpointTokenMode,
  whitelist: WhitelistItem[],
) =>
  [
    ...new Set(
      whitelist.filter(item => item.type === type).flatMap(item => item.list),
    ),
  ].length;

export const getWhitelistCounts = (whitelist: WhitelistItem[] = []) => {
  const domainsCount = getCountByType(REFERER, whitelist);
  const isDomainsListFull = domainsCount === getWhitelistItemsLimit(REFERER);

  const ipsCount = getCountByType(IP, whitelist);
  const isIPsListFull = ipsCount === getWhitelistItemsLimit(IP);

  const smartContractsCount = getCountByType(ADDRESS, whitelist);
  const isSmartContractsListFull =
    smartContractsCount === getWhitelistItemsLimit(ADDRESS);

  return {
    domainsCount,
    ipsCount,
    isDomainsListFull,
    isIPsListFull,
    isSmartContractsListFull,
    smartContractsCount,
  };
};
