import { BigNumber } from 'bignumber.js';

import {
  AvailableReadProviders,
  AvailableWriteProviders,
  BlockchainNetworkId,
  Web3KeyProvider,
  Web3KeyReadProvider,
} from 'provider';

import { configFromEnv } from 'modules/api/config';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { ZERO } from 'modules/common/const';
import { Env } from 'modules/common/types';
import { Token } from 'modules/common/types/token';

import ABI_ERC20 from '../../api/contract/IERC20.json';
import AMATICB_ABI from '../../stake-polygon/api/contracts/aMATICb.json';

const config = configFromEnv();

export const currentEnv: Env = process.env.REACT_APP_API_ENV
  ? (process.env.REACT_APP_API_ENV as Env)
  : Env.Stage;

export class DashboardSDK {
  private static instance?: DashboardSDK;

  private currentAccount = '';

  private constructor(
    private readonly provider: Web3KeyReadProvider,
    private readonly writeProvider: Web3KeyProvider,
  ) {
    DashboardSDK.instance = this;
    this.currentAccount = writeProvider.currentAccount;
  }

  public static async getInstance(): Promise<DashboardSDK> {
    const providerManager = ProviderManagerSingleton.getInstance();
    const provider = await providerManager.getReadProvider(
      currentEnv === Env.Production
        ? AvailableReadProviders.polygon
        : AvailableReadProviders.binanceChainTest,
    );

    const writeProvider = await providerManager.getProvider(
      AvailableWriteProviders.ethCompatible,
    );

    const isActualProvider = DashboardSDK.instance?.provider === provider;

    if (DashboardSDK.instance && isActualProvider) {
      return DashboardSDK.instance;
    }

    return new DashboardSDK(provider, writeProvider);
  }

  public async getBalance({
    token,
    networkID,
  }: {
    token: Token;
    networkID: BlockchainNetworkId;
  }): Promise<BigNumber> {
    const { abi, address } = this.getContractDataForToken({ token, networkID });

    const tokenContract = address
      ? this.provider.createContract(abi, address)
      : undefined;

    if (tokenContract) {
      const web3 = this.provider.getWeb3();

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
    networkID: BlockchainNetworkId;
  }): { abi: unknown; address: string } {
    switch (networkID) {
      case BlockchainNetworkId.smartchainTestnet: {
        switch (token) {
          case Token.aMATICb: {
            return {
              abi: ABI_ERC20,
              address: config.binanceConfig.aMATICbToken,
            };
          }

          default: {
            return { abi: ABI_ERC20, address: '' };
          }
        }
      }

      case BlockchainNetworkId.goerli: {
        switch (token) {
          case Token.aMATICb: {
            return {
              abi: ABI_ERC20,
              address: config.contractConfig.aMaticbToken,
            };
          }

          default: {
            return { abi: ABI_ERC20, address: '' };
          }
        }
      }

      case BlockchainNetworkId.polygon: {
        return { abi: AMATICB_ABI, address: config.polygonConfig.aMATICbToken };
      }

      default: {
        return { abi: ABI_ERC20, address: '' };
      }
    }
  }
}
