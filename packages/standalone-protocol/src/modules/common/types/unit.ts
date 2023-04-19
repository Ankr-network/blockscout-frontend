import { ChainId } from 'domains/chains/api/chain';
import { tHTML } from 'modules/i18n/utils/intl';

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

  if (chainId === ChainId.Polygon) {
    return 'polygon pos';
  }

  if (chainId === ChainId.POLYGON_ZKEVM) {
    return 'polygon zkevm';
  }

  return chainId ?? '';
};

export const renderTitle = (chainId: ChainId): string => {
  const shouldRenderNoBreakTitle = chainId === ChainId.POLYGON_ZKEVM;
  const titleIntl = shouldRenderNoBreakTitle ? 'no-break-title' : 'title';

  return tHTML(`chain-item.header.${titleIntl}`, {
    name: renderChainName(chainId),
  });
};