import BigNumber from 'bignumber.js';

import { ONE } from 'modules/common/const';

interface IGetUSDAmountProps {
  amount: BigNumber;
  /**
   *  Note: Greater than 0. Bonds = 1, Certificates = customRatioValue
   */
  ratio?: BigNumber;
  totalStaked?: BigNumber;
  totalStakedUsd?: BigNumber;
}

export const getUSDAmount = ({
  amount,
  ratio = ONE,
  totalStaked,
  totalStakedUsd,
}: IGetUSDAmountProps): BigNumber | undefined => {
  if (
    amount.isLessThanOrEqualTo(0) ||
    !amount.isFinite() ||
    ratio?.isLessThanOrEqualTo(0) ||
    !ratio?.isFinite() ||
    !totalStaked ||
    totalStaked.isLessThanOrEqualTo(0) ||
    !totalStaked.isFinite() ||
    !totalStakedUsd ||
    totalStakedUsd.isLessThanOrEqualTo(0) ||
    !totalStakedUsd.isFinite()
  ) {
    return undefined;
  }

  const oneTokenUSD = totalStakedUsd.div(totalStaked);

  // Note: (amount / ratio) * (totalStakedUsd / totalStaked)
  return amount.div(ratio).multipliedBy(oneTokenUSD);
};
