import BigNumber from 'bignumber.js';

interface IGroupedZeroes {
  lead: string;
  zeroesCount: number;
  number: string;
}

const MIN_VALUE_LENGTH = 5;
const MIN_VALUE_TO_FORMAT = 0.0001;

export const groupLeadingFloatZeroes = (
  value: BigNumber,
  maxLength = Infinity,
): IGroupedZeroes => {
  let lead = '0.0';
  let zeroesCount = 0;
  let number = '';
  const valueStr = value.toString(10);

  if (maxLength < MIN_VALUE_LENGTH) {
    throw new Error('groupLeadingFloatZeroes: Max length should be more than');
  }

  if (value.isGreaterThanOrEqualTo(MIN_VALUE_TO_FORMAT)) {
    lead = value.round().toFormat();
  } else if (value.isZero()) {
    lead = '0';
  } else if (valueStr.length <= maxLength) {
    lead = value.toString(10);
  } else {
    let parsedValue = valueStr.replace(lead, '');
    while (parsedValue[0] === '0') {
      zeroesCount += 1;
      parsedValue = parsedValue.slice(1);
    }
    const subIndexSymbols = zeroesCount > 0 ? 1 : 0;
    number = parsedValue
      .slice(0, maxLength - (lead.length + subIndexSymbols))
      .replace(/0+$/, '');
  }

  return {
    lead,
    zeroesCount,
    number,
  };
};
