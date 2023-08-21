import BigNumber from 'bignumber.js';

import { AddToWhitelistFormData } from 'domains/projects/store';
import { WhiteListItem } from 'domains/projects/types';

export const getFinalPrice = (
  whitelistItems: AddToWhitelistFormData[] = [],
  planPrice = '0',
) => {
  const contractAddressesCount = whitelistItems?.filter(
    item => item.type === WhiteListItem.address,
  ).length;

  return new BigNumber(planPrice)
    .multipliedBy(contractAddressesCount)
    .toString();
};
