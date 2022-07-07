import BigNumber from 'bignumber.js';

import { ONE } from 'modules/common/const';

interface IGetUSDAmountProps {
  amount: BigNumber;
  totalStaked?: BigNumber;
  totalStakedUsd?: BigNumber;
  /**
   * Note: Bonds = 1, Certificates = customRatioValue
   */
  ratio?: BigNumber;
}

export const getUSDAmount = ({
  amount,
  totalStaked,
  totalStakedUsd,
  ratio = ONE,
}: IGetUSDAmountProps): BigNumber | undefined => {
  if (!totalStaked || !totalStakedUsd) {
    return undefined;
  }

  const oneTokenUSD = totalStakedUsd.div(totalStaked).multipliedBy(ratio);
  const usdAmount = oneTokenUSD.multipliedBy(amount);

  return usdAmount.isZero() ? undefined : usdAmount;
};
