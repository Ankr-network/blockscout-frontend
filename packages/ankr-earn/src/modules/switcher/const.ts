import { configFromEnv } from 'modules/api/config';
import { Token } from 'modules/common/types/token';

const { contractConfig } = configFromEnv();

export const TOKEN_ADDRESSES: Record<Token.aETHb | Token.aETHc, string> = {
  aETHb: contractConfig.fethContract,
  aETHc: contractConfig.aethContract,
};
