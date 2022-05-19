import { BigNumber } from 'bignumber.js';

import {
  AvailableReadProviders,
  EEthereumNetworkId,
  Web3KeyWriteProvider,
} from 'provider';

import { configFromEnv } from 'modules/api/config';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import {
  BSC_PROVIDER_BY_ENV,
  ETH_PROVIDER_BY_ENV,
  FTM_PROVIDER_BY_ENV,
  POLYGON_PROVIDER_BY_ENV,
  ZERO,
} from 'modules/common/const';
import { Env } from 'modules/common/types';
import { Token } from 'modules/common/types/token';

import ABI_AETHB from '../../api/contract/FETH.json';
import ABI_ERC20 from '../../api/contract/IERC20.json';
import AFTMB_ABI from '../../stake-fantom/api/contracts/aFTMb.json';
import AFTMC_ABI from '../../stake-fantom/api/contracts/aFTMc.json';
import AMATICB_ABI from '../../stake-polygon/api/contracts/aMATICb.json';
import AMATICC_ABI from '../../stake-polygon/api/contracts/aMATICc.json';

const config = configFromEnv();

export const currentEnv: Env = process.env.REACT_APP_API_ENV
  ? (process.env.REACT_APP_API_ENV as Env)
  : Env.Stage;

interface IDashboardSDKCotractData {
  abi: unknown;
  address: string;
  providerName: AvailableReadProviders;
}

export const addressMapForTokenBSC: {
  [token in Token]?: IDashboardSDKCotractData;
} = {
  [Token.aMATICb]: {
    abi: AMATICB_ABI,
    address: config.binanceConfig.aMATICbToken,
    providerName: BSC_PROVIDER_BY_ENV,
  },

  [Token.aETHb]: {
    abi: ABI_AETHB,
    address: config.binanceConfig.aETHbToken,
    providerName: BSC_PROVIDER_BY_ENV,
  },

  [Token.aMATICc]: {
    abi: AMATICC_ABI,
    address: config.binanceConfig.aMATICcToken,
    providerName: BSC_PROVIDER_BY_ENV,
  },
};

export const addressMapForTokenGoerli: {
  [token in Token]?: IDashboardSDKCotractData;
} = {
  [Token.aMATICb]: {
    abi: AMATICB_ABI,
    address: config.contractConfig.aMaticbToken,
    providerName: ETH_PROVIDER_BY_ENV,
  },

  [Token.aETHb]: {
    abi: ABI_AETHB,
    address: config.contractConfig.fethContract,
    providerName: ETH_PROVIDER_BY_ENV,
  },
};

export const addressMapForTokenPolygon: {
  [token in Token]?: IDashboardSDKCotractData;
} = {
  [Token.aMATICb]: {
    abi: AMATICB_ABI,
    address: config.polygonConfig.aMATICbToken,
    providerName: POLYGON_PROVIDER_BY_ENV,
  },

  [Token.aMATICc]: {
    abi: AMATICC_ABI,
    address: config.polygonConfig.aMATICcToken,
    providerName: POLYGON_PROVIDER_BY_ENV,
  },
};

export const addressMapForTokenFantom: {
  [token in Token]?: IDashboardSDKCotractData;
} = {
  [Token.aFTMb]: {
    abi: AFTMB_ABI,
    address: config.fantomConfig.aftmbToken,
    providerName: FTM_PROVIDER_BY_ENV,
  },
  [Token.aFTMc]: {
    abi: AFTMC_ABI,
    address: config.fantomConfig.aftmcToken,
    providerName: FTM_PROVIDER_BY_ENV,
  },
};

export class DashboardSDK {
  private static instance?: DashboardSDK;

  private currentAccount = '';

  private constructor(private readonly writeProvider: Web3KeyWriteProvider) {
    DashboardSDK.instance = this;
    this.currentAccount = writeProvider.currentAccount;
  }

  public static async getInstance(): Promise<DashboardSDK> {
    const providerManager = ProviderManagerSingleton.getInstance();

    const writeProvider = await providerManager.getETHWriteProvider();
    if (DashboardSDK.instance) {
      return DashboardSDK.instance;
    }

    return new DashboardSDK(writeProvider);
  }

  private async getReadProvider(providerName: AvailableReadProviders) {
    const providerManager = ProviderManagerSingleton.getInstance();
    const provider = await providerManager.getETHReadProvider(providerName);
    return provider;
  }

  public async getBalance({
    token,
    networkID,
  }: {
    token: Token;
    networkID: EEthereumNetworkId;
  }): Promise<BigNumber> {
    const { abi, address, providerName } = this.getContractDataForToken({
      token,
      networkID,
    });
    const provider = await this.getReadProvider(providerName);

    const tokenContract = address
      ? provider.createContract(abi, address)
      : undefined;

    if (tokenContract) {
      const web3 = provider.getWeb3();

      const balance: string = await tokenContract.methods
        .balanceOf(this.currentAccount)
        .call();

      return new BigNumber(web3.utils.fromWei(balance));
    }
    return new BigNumber(ZERO);
  }

  private getContractDataForToken({
    token,
    networkID,
  }: {
    token: Token;
    networkID: EEthereumNetworkId;
  }): IDashboardSDKCotractData {
    const EMPTY = {
      abi: ABI_ERC20,
      address: '',
      providerName: ETH_PROVIDER_BY_ENV,
    };

    switch (networkID) {
      case EEthereumNetworkId.smartchainTestnet:
      case EEthereumNetworkId.smartchain: {
        return addressMapForTokenBSC[token] || EMPTY;
      }

      case EEthereumNetworkId.goerli:
      case EEthereumNetworkId.mainnet: {
        return addressMapForTokenGoerli[token] || EMPTY;
      }

      case EEthereumNetworkId.polygon: {
        return addressMapForTokenPolygon[token] || EMPTY;
      }

      case EEthereumNetworkId.fantom:
      case EEthereumNetworkId.fantomTestnet: {
        return addressMapForTokenFantom[token] || EMPTY;
      }

      default: {
        return EMPTY;
      }
    }
  }
}
