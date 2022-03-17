export function getShortTxHash(str?: string, len = 5): string {
  if (typeof str !== 'string') {
    return '';
  }

  if (str.length <= 12) {
    return str;
  }

  return `${str.slice(0, len)}...${str.slice(-len)}`;
}

export function getExtraShortStr(str?: string): string {
  if (typeof str !== 'string') {
    return '';
  }

  if (str.length <= 5) {
    return str;
  }

  return `${str.slice(0, 5)}...`;
}
