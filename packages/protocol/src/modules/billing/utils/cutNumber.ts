export interface ICutNumberParams {
  decimals: number;
  digits: number;
  number: string;
}

const separator = '.';

export const cutNumber = ({ decimals, digits, number }: ICutNumberParams) => {
  const [integer, fraction] = number.split(separator);
  const cutInteger = integer.slice(0, digits);

  if (typeof fraction === 'undefined') {
    return cutInteger;
  }

  return cutInteger + separator + fraction.slice(0, decimals);
};
