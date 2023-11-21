import BigNumber from 'bignumber.js';
import { UserEndpointTokenMode } from 'multirpc-sdk';

import { AddToWhitelistFormData } from 'domains/projects/store';

export const getFinalPrice = (
  whitelistItems: AddToWhitelistFormData[] = [],
  planPrice = '0',
) => {
  const contractAddressesCount = whitelistItems?.filter(
    item => item.type === UserEndpointTokenMode.ADDRESS,
  ).length;

  return new BigNumber(planPrice)
    .multipliedBy(contractAddressesCount)
    .toString();
};
