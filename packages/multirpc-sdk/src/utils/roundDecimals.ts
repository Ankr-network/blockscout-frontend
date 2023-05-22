import BigNumber from 'bignumber.js';
import Web3 from 'web3';

const MAX_DECIMALS = 2;

export const formatFromWei = (value: BigNumber) => {
  return new BigNumber(Web3.utils.fromWei(value.toString(10))).toFixed(
    MAX_DECIMALS,
    1,
  );
};

export const formatToWei = (amount: BigNumber) => {
  return new BigNumber(Web3.utils.toWei(amount.toString(10)));
};

export const roundDecimals = (value: BigNumber) => {
  const roundedAmount = formatFromWei(value);

  return new BigNumber(Web3.utils.toWei(roundedAmount));
};
