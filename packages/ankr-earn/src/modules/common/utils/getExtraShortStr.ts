export function getExtraShortStr(str?: string): string {
  if (typeof str !== 'string') {
    return '';
  }

  if (str.length <= 5) {
    return str;
  }

  return `${str.slice(0, 5)}...`;
}
