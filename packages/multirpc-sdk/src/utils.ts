import { Base64, PrefixedHex } from './types';

export const base64ToPrefixedHex = (value: Base64): PrefixedHex => {
  return `0x${Buffer.from(value, 'base64').toString('hex')}`;
};

export const prefixedHexToBase64 = (value: PrefixedHex): Base64 => {
  return Buffer.from(value.substr(2), 'hex').toString('base64');
};
