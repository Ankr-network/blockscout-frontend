import BigNumber from 'bignumber.js';

import { getSign } from 'modules/common/utils/getSign';

export const formatAmount = (amount: number) => {
  return getSign(amount) + new BigNumber(amount).toFormat();
};
