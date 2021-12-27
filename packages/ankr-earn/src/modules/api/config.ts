import { currentEnv } from 'modules/common/const';
import { Env } from 'modules/common/types';

export interface IContractConfig {
  ETHContract: string;
  aethContract: string;
  fethContract: string;
  maticToken: string;
  aMaticbToken: string;
  polygonPool?: string;
  ankrContract: string;
}

export interface IGatewayConfig {
  baseUrl: string;
}

export interface IStkrConfig {
  contractConfig: IContractConfig;
  gatewayConfig: IGatewayConfig;
}

const LOCAL_CONFIG: IStkrConfig = {
  contractConfig: {
    ankrContract: '0x7feD49F5B0497A060cdcfF50BdBD22E5d07661d8',
    ETHContract: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    aethContract: '0x63dC5749fa134fF3B752813388a7215460a8aB01',
    fethContract: '0xe64FCf6327bB016955EFd36e75a852085270c374',
    maticToken: '0x499d11E0b6eAC7c0593d8Fb292DCBbF815Fb29Ae',
    aMaticbToken: '0xc207D085825B57323B4359c0eE7c286A43952B8f',
  },
  gatewayConfig: {
    baseUrl: 'http://localhost:8080/',
  },
};

const DEVELOP_CONFIG: IStkrConfig = {
  ...LOCAL_CONFIG,
  gatewayConfig: {
    baseUrl: 'https://api.dev.stkr.io/',
  },
};

const GOERLI_CONFIG: IStkrConfig = {
  ...{
    contractConfig: {
      ...LOCAL_CONFIG.contractConfig,
      ...{
        futureBondAVAX: '0xdb08E6fbFd8fF23BF8813968138e95304af1Ff13',
        polygonPool: '0xEdef5C8a69f086099e14746F5A5c0B1Dd4d0054C',
        aMaticbToken: '0x655D2DB109f703AA85dB46CB25E90806ddaF64cD',
      },
    },
  },
  gatewayConfig: {
    baseUrl: 'https://api.goerli.stkr.io/',
  },
};

const MAINNET_CONFIG: IStkrConfig = {
  contractConfig: {
    ankrContract: '0x8290333cef9e6d528dd5618fb97a76f268f3edd4',
    ETHContract: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    aethContract: '0xE95A203B1a91a908F9B9CE46459d101078c2c3cb',
    fethContract: '0xD01ef7C0A5d8c432fc2d1a85c66cF2327362E5C6',
    maticToken: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
    aMaticbToken: '0x99534Ef705Df1FFf4e4bD7bbaAF9b0dFf038EbFe',
  },
  gatewayConfig: {
    baseUrl: 'https://api.stkr.io/',
  },
};

export function configFromEnv(env = currentEnv): IStkrConfig {
  switch (env) {
    case Env.Production:
      return MAINNET_CONFIG;
    case Env.Stage:
      return GOERLI_CONFIG;
    case Env.Develop:
      return DEVELOP_CONFIG;
    default:
      return LOCAL_CONFIG;
  }
}
