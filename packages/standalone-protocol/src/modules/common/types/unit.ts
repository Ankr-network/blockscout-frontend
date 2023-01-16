import { ChainId } from 'domains/chains/api/chain';

export type Bytes = number;
export type Timestamp = number;
export type Milliseconds = number;
export type Seconds = number;
export type Minutes = number;
export type Days = number;

const BYTES_IN_MEGABYTE = 1048576;

export function convertBytesToMegabytes(value: Bytes, fixed = 0) {
  return (value / BYTES_IN_MEGABYTE).toFixed(fixed);
}

export const renderChainName = (chainId?: ChainId | string): string => {
  if (chainId === ChainId.Ethereum) {
    return 'Ethereum';
  }

  if (chainId === ChainId.Secret) {
    return 'Secret';
  }

  return chainId ?? '';
};
