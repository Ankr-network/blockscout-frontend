import { BlockchainNetworkId, IWeb3SendResult } from 'provider';

import { EthSDK } from 'modules/api/EthSDK';
import { BinanceSDK } from 'modules/stake-bnb/api/BinanceSDK';

import {
  ISwitcherSDKArgs,
  ISwitcherCommonDataArgs,
  ISwitcherCommonData,
  ISwitcherApproveArgs,
} from './types';

export class SwitcherSDK {
  private static instance: SwitcherSDK;

  private binanceSDK: BinanceSDK;

  private ethSDK: EthSDK;

  private constructor({ binanceSDK, ethSDK }: ISwitcherSDKArgs) {
    this.binanceSDK = binanceSDK;
    this.ethSDK = ethSDK;
  }

  public static async getInstance(): Promise<SwitcherSDK> {
    if (!SwitcherSDK.instance) {
      const [binanceSDK, ethSDK] = await Promise.all([
        BinanceSDK.getInstance(),
        EthSDK.getInstance(),
      ]);

      SwitcherSDK.instance = new SwitcherSDK({ binanceSDK, ethSDK });
    }

    return SwitcherSDK.instance;
  }

  public async getCommonData({
    chainId,
  }: ISwitcherCommonDataArgs): Promise<ISwitcherCommonData | undefined> {
    switch (chainId) {
      case BlockchainNetworkId.goerli:
      case BlockchainNetworkId.mainnet: {
        const [abBalance, acBalance, ratio, allowance] = await Promise.all([
          this.ethSDK.getAethbBalance(true),
          this.ethSDK.getAethcBalance(true),
          this.ethSDK.getAethcRatio(true),
          this.ethSDK.getAllowance(),
        ]);

        return { abBalance, acBalance, ratio, allowance };
      }

      case BlockchainNetworkId.smartchain:
      case BlockchainNetworkId.smartchainTestnet: {
        const [abBalance, acBalance, ratio, allowance] = await Promise.all([
          this.binanceSDK.getABNBBBalance(),
          this.binanceSDK.getABNBCBalance(),
          this.binanceSDK.getABNBCRatio(),
          this.binanceSDK.getAllowance(),
        ]);

        return { abBalance, acBalance, ratio, allowance };
      }

      default:
        return undefined;
    }
  }

  public async approve({
    chainId,
    amount,
  }: ISwitcherApproveArgs): Promise<IWeb3SendResult | undefined> {
    switch (chainId) {
      case BlockchainNetworkId.goerli:
      case BlockchainNetworkId.mainnet: {
        return this.ethSDK.approveAETHCForAETHB(amount);
      }

      case BlockchainNetworkId.smartchainTestnet:
      case BlockchainNetworkId.smartchain: {
        return this.binanceSDK.approveABNBCUnstake(amount);
      }

      default:
        return undefined;
    }
  }
}
