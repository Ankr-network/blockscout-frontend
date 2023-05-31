import { text } from './text';

const PERCENT_DECIMAL_NUMBER = 2;

export const getPercent = (value: number) => {
  const decimalNumber = String(value).split('.')[1]?.length;

  return decimalNumber > PERCENT_DECIMAL_NUMBER
    ? text('one-decimal-percent', { value })
    : text('percent', { value });
};
