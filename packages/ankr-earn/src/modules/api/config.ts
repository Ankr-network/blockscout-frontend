import { currentEnv, ZERO_ADDR } from 'modules/common/const';
import { Env } from 'modules/common/types';

export interface IContractConfig {
  ETHContract: string;
  aethContract: string;
  fethContract: string;
  maticToken: string;
  aMaticbToken: string;
  polygonPool: string;
  ankrContract: string;
}

export interface IAvalancheConfig {
  futureBondAVAX: string;
}

export interface IBinanceConfig {
  aBNBbToken: string;
  binancePool: string;
  WBNBContract: string;
}

interface IFantomConfig {
  fantomPool: string;
  aftmbToken: string;
}

export interface IGatewayConfig {
  baseUrl: string;
}

export interface IStkrConfig {
  contractConfig: IContractConfig;
  gatewayConfig: IGatewayConfig;
  avalancheConfig: IAvalancheConfig;
  binanceConfig: IBinanceConfig;
  fantomConfig: IFantomConfig;
}

const LOCAL_CONFIG: IStkrConfig = {
  contractConfig: {
    ankrContract: '0x7feD49F5B0497A060cdcfF50BdBD22E5d07661d8',
    ETHContract: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    aethContract: '0x63dC5749fa134fF3B752813388a7215460a8aB01',
    fethContract: '0xe64FCf6327bB016955EFd36e75a852085270c374',
    polygonPool: '0x261f8da3e31712D36aeaef53C8446a052735Ab53',
    maticToken: '0x499d11E0b6eAC7c0593d8Fb292DCBbF815Fb29Ae',
    aMaticbToken: '0xc207D085825B57323B4359c0eE7c286A43952B8f',
  },
  avalancheConfig: {
    futureBondAVAX: '0xb45A2749a3966992DC65fe8c22996E96C5c2BE3d',
  },
  binanceConfig: {
    aBNBbToken: '0x35336b3d0f5B58C3af6Ad71a3AA790256AE3B5dA',
    binancePool: '0xb7d6325fc0dE1c6B02af8A70A23F1d0119A452C8',
    WBNBContract: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
  },
  fantomConfig: {
    fantomPool: '0xB18ff393C0C75E3B8A445DF3E3bD0d9Ce03Fba4b',
    aftmbToken: '0x5bb1Ae7FaBA68CA80A88B7dF30eea239E62D502D',
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
  ...{
    avalancheConfig: {
      ...LOCAL_CONFIG.avalancheConfig,
      ...{
        futureBondAVAX: '0xBd97c29aa3E83C523C9714edCA8DB8881841a593',
      },
    },
  },
  binanceConfig: {
    ...LOCAL_CONFIG.binanceConfig,
  },
  fantomConfig: {
    ...LOCAL_CONFIG.fantomConfig,
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
    polygonPool: '0xCfD4B4Bc15C8bF0Fd820B0D4558c725727B3ce89',
    maticToken: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
    aMaticbToken: '0x99534Ef705Df1FFf4e4bD7bbaAF9b0dFf038EbFe',
  },
  avalancheConfig: {
    futureBondAVAX: '0x6C6f910A79639dcC94b4feEF59Ff507c2E843929',
  },
  binanceConfig: {
    // TODO Please add valid addresses for the Mainnet (BNB)
    aBNBbToken: '',
    binancePool: '',
    WBNBContract: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  },
  fantomConfig: {
    // todo: add production addr
    fantomPool: ZERO_ADDR,
    // todo: add production addr
    aftmbToken: ZERO_ADDR,
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
