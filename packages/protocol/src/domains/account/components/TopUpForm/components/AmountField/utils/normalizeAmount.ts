const cutDecimals = (value: string, maxDecimals: number) => {
  const [, decimals] = value.split('.');

  if (decimals && decimals.length > maxDecimals) {
    return value.slice(0, -1);
  }

  return value;
};

export const normalizeAmount = (value: string, maxDecimals: number) => {
  // only numbers and dot
  const normilized = value.replace(',', '.').replace(/[^0-9.]/g, '');

  return cutDecimals(normilized, maxDecimals);
};
