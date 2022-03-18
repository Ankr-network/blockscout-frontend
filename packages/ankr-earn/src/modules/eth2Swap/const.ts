import { configFromEnv } from 'modules/api/config';

import { TSwapOption } from './types';

export const TOKENS: Record<TSwapOption, TSwapOption> = {
  aETHc: 'aETHb',
  aETHb: 'aETHc',
};

const { contractConfig } = configFromEnv();

export const TOKEN_ADDRESSES: Record<TSwapOption, string> = {
  aETHb: contractConfig.fethContract,
  aETHc: contractConfig.aethContract,
};
