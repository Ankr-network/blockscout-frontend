import { Address } from 'provider';

import { currentEnv, ZERO_ADDR } from 'modules/common/const';
import { Env } from 'modules/common/types';

export interface IContractConfig {
  ETHContract: string;
  aethContract: string;
  fethContract: string;
  maticToken: string;
  aMaticbToken: string;
  aMaticCToken: string;
  polygonPool: string;
  globalPoolDepositContract: string;
  ethereumPool: string;
  systemContract: string;
  ankrContract: string;
  bridge: string;
}

export interface IAvalancheConfig {
  avalanchePool: string;
  futureBondAVAX: string;
}

export interface IBinanceConfig {
  aBNBbToken: string;
  aBNBcToken: string;
  aMATICbToken: string;
  aETHbToken: string;
  aETHcToken: string;
  binancePool: string;
  WBNBContract: string;
  bridge: string;
}

export interface IFantomConfig {
  fantomPool: string;
  aftmbToken: string;
  aftmcToken: string;
  ftmToken: string;
}

interface IPolkadotConfig {
  aDOTbToken: Address | null;
  aKSMbToken: Address | null;
  aWNDbToken: Address | null;
  polkadotPool: Address;
}

interface IPolygonConfig {
  bridge: string;
  aMATICbToken: string;
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
  polkadotConfig: IPolkadotConfig;
  polygonConfig: IPolygonConfig;
}

const LOCAL_CONFIG: IStkrConfig = {
  contractConfig: {
    // for eth staking
    systemContract: '0xF2dFBCbE94Ff3A402B8575b80E5e785BC936c1c3',
    ethereumPool: '0x5ea4C3a6CA22B38a1D6776329bb8b4073C157B27',
    globalPoolDepositContract: '0x07b39F4fDE4A38bACe212b546dAc87C58DfE3fDC',
    ankrContract: '0x7feD49F5B0497A060cdcfF50BdBD22E5d07661d8',
    ETHContract: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    aethContract: '0x63dC5749fa134fF3B752813388a7215460a8aB01',
    fethContract: '0xe64FCf6327bB016955EFd36e75a852085270c374',
    polygonPool: '0x261f8da3e31712D36aeaef53C8446a052735Ab53',
    maticToken: '0x499d11E0b6eAC7c0593d8Fb292DCBbF815Fb29Ae',
    aMaticbToken: '0x655D2DB109f703AA85dB46CB25E90806ddaF64cD',
    aMaticCToken: '0x148BF822CAE6a61B2F278801eF4369FddD2a80DF',
    bridge: '0x840bCaEcb232b9F3a04F641458B49FD768C6e3aE',
  },
  avalancheConfig: {
    avalanchePool: '0x0C29D40cBD3c9073f4C0c96Bf88Ae1B4b4FE1d11',
    futureBondAVAX: '0xBd97c29aa3E83C523C9714edCA8DB8881841a593',
  },
  binanceConfig: {
    aBNBbToken: '0xab56897fe4e9f0757e02b54c27e81b9ddd6a30ae',
    aBNBcToken: '0x46de2fbaf41499f298457cd2d9288df4eb1452ab',
    binancePool: '0x3C9205b5d4B312cA7C4d28110C91Fe2c74718a94',
    WBNBContract: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    aMATICbToken: '0xE453C6EA55FF55c560cf6c391bF0FA630A34BB02',
    // todo: add actual dev aETHc token address
    aETHcToken: ZERO_ADDR,
    bridge: '0x840bCaEcb232b9F3a04F641458B49FD768C6e3aE',
    aETHbToken: '0x1f28E2FAA7DebF805e2fFbb1D6A104170dD64521',
  },
  fantomConfig: {
    fantomPool: '0x7B72E8117E69951F1b00178016EEaEE4ce715f28',
    aftmbToken: '0x65Bc73117C1c8A1E421858650dDA32dcc50B8eE6',
    aftmcToken: '0x5DA48feC18C1EE2C36308E1e2D569668a0Cd8Edd',
    ftmToken: ZERO_ADDR,
  },
  polkadotConfig: {
    aDOTbToken: null,
    aKSMbToken: null,
    aWNDbToken: '0xF8942990985cB8E3196b24B7f9c584945493AC3A',
    polkadotPool: '0xc9EdEe06D78aE8Ee0d694b2e96E457a239F4DeeE',
  },
  polygonConfig: {
    bridge: '0x840bCaEcb232b9F3a04F641458B49FD768C6e3aE',
    aMATICbToken: '0xc207D085825B57323B4359c0eE7c286A43952B8f',
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
  polkadotConfig: {
    ...LOCAL_CONFIG.polkadotConfig,
  },
  polygonConfig: {
    ...LOCAL_CONFIG.polygonConfig,
  },
  gatewayConfig: {
    baseUrl: 'https://api.goerli.stkr.io/',
  },
};

const MAINNET_CONFIG: IStkrConfig = {
  contractConfig: {
    // for eth staking
    systemContract: '0x3bFce37B5401BEF13C78830D3A9FB14294d18c4F',
    ethereumPool: '0x84db6eE82b7Cf3b47E8F19270abdE5718B936670',
    globalPoolDepositContract: '0x00000000219ab540356cBB839Cbe05303d7705Fa',
    ankrContract: '0x8290333cef9e6d528dd5618fb97a76f268f3edd4',
    ETHContract: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    aethContract: '0xE95A203B1a91a908F9B9CE46459d101078c2c3cb',
    fethContract: '0xD01ef7C0A5d8c432fc2d1a85c66cF2327362E5C6',
    polygonPool: '0xCfD4B4Bc15C8bF0Fd820B0D4558c725727B3ce89',
    maticToken: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
    aMaticbToken: '0x99534Ef705Df1FFf4e4bD7bbaAF9b0dFf038EbFe',
    aMaticCToken: '0x26dcFbFa8Bc267b250432c01C982Eaf81cC5480C',
    bridge: '0xc437DF90B37C1dB6657339E31BfE54627f0e7181',
  },
  avalancheConfig: {
    avalanchePool: '0x7BAa1E3bFe49db8361680785182B80BB420A836D',
    futureBondAVAX: '0x6C6f910A79639dcC94b4feEF59Ff507c2E843929',
  },
  binanceConfig: {
    aBNBbToken: '0xBb1Aa6e59E5163D8722a122cd66EBA614b59df0d',
    aBNBcToken: '0xE85aFCcDaFBE7F2B096f268e31ccE3da8dA2990A',
    binancePool: '0x66BEA595AEFD5a65799a920974b377Ed20071118',
    WBNBContract: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    aMATICbToken: '0x7465b49f83bfd74e8df8574d43bfff34edbc1758',
    // todo: add actual production aETHc token address
    aETHcToken: ZERO_ADDR,
    bridge: '0xc437DF90B37C1dB6657339E31BfE54627f0e7181',
    aETHbToken: '0x1075bea848451a13fd6f696b5d0fda52743e6439',
  },
  fantomConfig: {
    fantomPool: '0x84db6ee82b7cf3b47e8f19270abde5718b936670',
    aftmbToken: '0xB42bF10ab9Df82f9a47B86dd76EEE4bA848d0Fa2',
    aftmcToken: ZERO_ADDR,
    ftmToken: ZERO_ADDR,
  },
  polkadotConfig: {
    aDOTbToken: '0x5cc56c266143f29a5054b9ae07f3ac3513a7965e',
    aKSMbToken: '0x84da8e731172827fcb233b911678e2a82e27baf2',
    aWNDbToken: null,
    polkadotPool: '0x59f767EC659E9FE01ebCf930465E2aD4Cc0F208e',
  },
  polygonConfig: {
    bridge: '0x31BE0FA706E391a88C3A09cC13112bd55E0887f5',
    aMATICbToken: '0x03A97594aA5ecE130E2E956fc0cEd2fea8ED8989',
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
