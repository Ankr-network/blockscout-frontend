import {
  AvailableReadProviders,
  EEthereumNetworkId,
  Web3KeyWriteProvider,
} from '@ankr.com/provider-core';
import { BigNumber } from 'bignumber.js';

import { ProviderManagerSingleton } from '@ankr.com/staking-sdk';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import {
  bscTokenConfig,
  EMPTY_CONTRACT_DATA,
  ethereumTokenConfig,
  fantomTokenConfig,
  polygonTokenConfig,
} from './const';
import { IDashboardSDKCotractData } from './types';

// todo: add tests
export class DashboardSDK {
  private static instance?: DashboardSDK;

  private currentAccount = '';

  private constructor(writeProvider: Web3KeyWriteProvider) {
    DashboardSDK.instance = this;
    this.currentAccount = writeProvider.currentAccount;
  }

  public static async getInstance(): Promise<DashboardSDK> {
    const providerManager = ProviderManagerSingleton.getInstance();
    const writeProvider = await providerManager.getETHWriteProvider();

    const addrHasNotBeenUpdated =
      DashboardSDK.instance?.currentAccount === writeProvider.currentAccount;

    if (DashboardSDK.instance && addrHasNotBeenUpdated) {
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
    const { abi, address, providerName } = DashboardSDK.getContractDataForToken(
      token,
      networkID,
    );

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

  private static getContractDataForToken(
    token: Token,
    networkID: EEthereumNetworkId,
  ): IDashboardSDKCotractData {
    switch (networkID) {
      case EEthereumNetworkId.smartchainTestnet:
      case EEthereumNetworkId.smartchain: {
        return bscTokenConfig[token] || EMPTY_CONTRACT_DATA;
      }

      case EEthereumNetworkId.goerli:
      case EEthereumNetworkId.mainnet: {
        return ethereumTokenConfig[token] || EMPTY_CONTRACT_DATA;
      }

      case EEthereumNetworkId.mumbai:
      case EEthereumNetworkId.polygon: {
        return polygonTokenConfig[token] || EMPTY_CONTRACT_DATA;
      }

      case EEthereumNetworkId.fantom:
      case EEthereumNetworkId.fantomTestnet: {
        return fantomTokenConfig[token] || EMPTY_CONTRACT_DATA;
      }

      default: {
        return EMPTY_CONTRACT_DATA;
      }
    }
  }
}
