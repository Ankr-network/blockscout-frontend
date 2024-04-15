export const getSign = (direction?: boolean): string => {
  if (typeof direction === 'undefined') {
    return '';
  }

  return direction ? '+' : '-';
};
