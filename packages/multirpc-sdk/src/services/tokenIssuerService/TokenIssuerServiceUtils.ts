export const formatHexToString = (hexx: string) => {
  const hex = hexx.toString();
  let str = '';

  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }

  return str;
};
