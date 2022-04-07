import { configFromEnv } from 'modules/api/config';
import { Token } from 'modules/common/types/token';

import { TSwapOption } from './types';

export const TOKENS: Record<TSwapOption, TSwapOption> = {
  aETHc: Token.aETHb,
  aETHb: Token.aETHc,
};

const { contractConfig } = configFromEnv();

export const TOKEN_ADDRESSES: Record<TSwapOption, string> = {
  aETHb: contractConfig.fethContract,
  aETHc: contractConfig.aethContract,
};
