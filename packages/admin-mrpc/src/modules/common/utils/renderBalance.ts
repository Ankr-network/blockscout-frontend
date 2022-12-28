import BigNumber from 'bignumber.js';

const MAX_DECIMALS_LENGTH = 2;
const MIN_DISPLAY_BALANCE = 0.01;

export const formatNumber = (value: string | number | BigNumber = '') => {
  if (!value) {
    return '—';
  }

  const amount = new BigNumber(value);

  return amount.toFormat();
};

export const renderBalance = (
  value: string | number | BigNumber = '',
  units?: string,
) => {
  if (!value) {
    return '—';
  }

  const amount = new BigNumber(value);

  const absBalance = amount.absoluteValue();

  const balanceValue = absBalance.isLessThan(MIN_DISPLAY_BALANCE)
    ? amount.precision(1).toFormat()
    : amount.toFormat(MAX_DECIMALS_LENGTH);

  return units ? `${balanceValue} ${units}` : balanceValue;
};

export const renderUSD = (value?: string | number | BigNumber) => {
  if (!value) {
    return '—';
  }

  const number = renderBalance(value);

  return number[0] === '-' ? `-$${number.slice(1)}` : `$${number}`;
};
