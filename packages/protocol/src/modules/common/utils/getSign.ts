export const getSign = (number: number) => {
  if (!number) {
    return '';
  }

  return number > 0 ? '+' : '-';
};
