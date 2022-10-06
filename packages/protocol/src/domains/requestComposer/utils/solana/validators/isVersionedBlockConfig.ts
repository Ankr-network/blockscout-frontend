import { GetVersionedBlockConfig } from '@solana/web3.js';

import { getJSON } from '../getJSON';
import { isFinality } from './isFinality';
import { isNumber } from './isNumber';

export const isVersionedBlockConfig = (raw: string): boolean => {
  const json = getJSON(raw) as GetVersionedBlockConfig;

  const isFinalityValid = !json.commitment || isFinality(json.commitment);
  const isMaxVersionValid =
    typeof json.maxSupportedTransactionVersion === 'undefined' ||
    isNumber(json.maxSupportedTransactionVersion.toString());

  return json && isFinalityValid && isMaxVersionValid;
};
