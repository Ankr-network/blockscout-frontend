export function getShortStr(str?: string): string {
  if (typeof str !== 'string') {
    return '';
  }

  if (str.length <= 12) {
    return str;
  }

  return `${str.slice(0, 5)}...${str.slice(-4)}`;
}
