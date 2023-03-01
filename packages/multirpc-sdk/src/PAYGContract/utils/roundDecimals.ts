import BigNumber from 'bignumber.js';
import Web3 from 'web3';

const MAX_DECIMALS = 2;

export const roundDecimals = (allowance: BigNumber) => {
  const roundedAmount = new BigNumber(
    Web3.utils.fromWei(allowance.toString(10)),
  ).toFixed(MAX_DECIMALS, 1);

  return new BigNumber(Web3.utils.toWei(roundedAmount));
};
