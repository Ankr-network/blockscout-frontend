import BigNumber from 'bignumber.js';

import { CRYPTO_FEE_DECIMALS } from '../const';

export interface IRoundCryptoFeeParams {
  feeCrypto: number;
}

export const roundCryptoFee = ({ feeCrypto }: IRoundCryptoFeeParams) => {
  return new BigNumber(feeCrypto)
    .decimalPlaces(CRYPTO_FEE_DECIMALS, BigNumber.ROUND_UP)
    .toNumber();
};
