import { isMainnet } from 'modules/common/constants/const';

export interface IContractConfig {
  EACAggregatorProxyContract: string;
}

export interface IProtocolConfig {
  contractConfig: IContractConfig;
}

const MAINNET_CONFIG: IProtocolConfig = {
  contractConfig: {
    EACAggregatorProxyContract: '0x7eed379bf00005cfed29fed4009669de9bcc21ce',
  },
};

const STAGE_CONFIG: IProtocolConfig = {
  ...MAINNET_CONFIG,
};

export const configFromEnv = isMainnet ? MAINNET_CONFIG : STAGE_CONFIG;
