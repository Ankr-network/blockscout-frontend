import { currentEnv } from 'modules/common/const';
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
  avalanchePool: string;
  futureBondAVAX: string;
}

export interface IBinanceConfig {
  aBNBbToken: string;
  binancePool: string;
  WBNBContract: string;
}

export interface IFantomConfig {
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
    aMaticbToken: '0x655D2DB109f703AA85dB46CB25E90806ddaF64cD',
  },
  avalancheConfig: {
    avalanchePool: '0x0C29D40cBD3c9073f4C0c96Bf88Ae1B4b4FE1d11',
    futureBondAVAX: '0xBd97c29aa3E83C523C9714edCA8DB8881841a593',
  },
  binanceConfig: {
    aBNBbToken: '0xab56897fe4e9f0757e02b54c27e81b9ddd6a30ae',
    binancePool: '0x3C9205b5d4B312cA7C4d28110C91Fe2c74718a94',
    WBNBContract: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
  },
  fantomConfig: {
    fantomPool: '0xF010F847CcA370d8e510F3a2204721Da78A19914',
    aftmbToken: '0x334257EF922C210b9F163F983770D5b3215e378B',
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
        polygonPool: '0xEdef5C8a69f086099e14746F5A5c0B1Dd4d0054C',
        aMaticbToken: '0x655D2DB109f703AA85dB46CB25E90806ddaF64cD',
      },
    },
  },
  avalancheConfig: {
    ...LOCAL_CONFIG.avalancheConfig,
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
    avalanchePool: '0x7BAa1E3bFe49db8361680785182B80BB420A836D',
    futureBondAVAX: '0x6C6f910A79639dcC94b4feEF59Ff507c2E843929',
  },
  binanceConfig: {
    aBNBbToken: '0xBb1Aa6e59E5163D8722a122cd66EBA614b59df0d',
    binancePool: '0x66BEA595AEFD5a65799a920974b377Ed20071118',
    WBNBContract: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  },
  fantomConfig: {
    fantomPool: '0x84db6ee82b7cf3b47e8f19270abde5718b936670',
    aftmbToken: '0xB42bF10ab9Df82f9a47B86dd76EEE4bA848d0Fa2',
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
