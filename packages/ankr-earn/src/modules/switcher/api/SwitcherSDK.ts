import BigNumber from 'bignumber.js';

import {
  AvailableWriteProviders,
  BlockchainNetworkId,
  IWeb3SendResult,
} from 'provider';

import { EthSDK } from 'modules/api/EthSDK';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { BinanceSDK } from 'modules/stake-bnb/api/BinanceSDK';
import { TBnbSyntToken } from 'modules/stake-bnb/types';

import {
  ISwitcherSDKArgs,
  ISwitcherCommonDataArgs,
  ISwitcherCommonData,
  ISwitcherApproveArgs,
  ISwitcherLockSharesArgs,
  ISwitcherUnlockSharesArgs,
  IFetchTxDataArgs,
  IFetchTxData,
  IFetchTxReceiptArgs,
  IFetchTxReceiptData,
  IAddTokenToWalletArgs,
} from './types';

export class SwitcherSDK {
  private static instance: SwitcherSDK;

  private binanceSDK: BinanceSDK;

  private ethSDK: EthSDK;

  private account: string;

  private constructor({ binanceSDK, ethSDK, account }: ISwitcherSDKArgs) {
    this.binanceSDK = binanceSDK;
    this.ethSDK = ethSDK;
    this.account = account;
  }

  public static async getInstance(): Promise<SwitcherSDK> {
    const providerManager = ProviderManagerSingleton.getInstance();
    const provider = providerManager.getWriteProviderById(
      AvailableWriteProviders.ethCompatible,
    );
    const account = provider?.currentAccount ?? '';
    const isAccoundChanged = SwitcherSDK.instance?.account !== account;

    if (!SwitcherSDK.instance || isAccoundChanged) {
      const [binanceSDK, ethSDK] = await Promise.all([
        BinanceSDK.getInstance(),
        EthSDK.getInstance(),
      ]);

      SwitcherSDK.instance = new SwitcherSDK({ binanceSDK, ethSDK, account });
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

  public async fetchTxData({
    chainId,
    txHash,
  }: IFetchTxDataArgs): Promise<IFetchTxData | undefined> {
    switch (chainId) {
      case BlockchainNetworkId.goerli:
      case BlockchainNetworkId.mainnet:
        return this.ethSDK.fetchTxData(txHash);

      case BlockchainNetworkId.smartchainTestnet:
      case BlockchainNetworkId.smartchain:
        return this.binanceSDK.fetchTxData(txHash);

      default:
        return undefined;
    }
  }

  public async fetchTxReceipt({
    chainId,
    txHash,
  }: IFetchTxReceiptArgs): Promise<IFetchTxReceiptData | undefined> {
    switch (chainId) {
      case BlockchainNetworkId.goerli:
      case BlockchainNetworkId.mainnet:
        return this.ethSDK.fetchTxReceipt(txHash);

      case BlockchainNetworkId.smartchainTestnet:
      case BlockchainNetworkId.smartchain:
        return this.binanceSDK.fetchTxReceipt(txHash);

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

  public async lockShares({
    chainId,
    amount,
  }: ISwitcherLockSharesArgs): Promise<IWeb3SendResult | undefined> {
    switch (chainId) {
      case BlockchainNetworkId.goerli:
      case BlockchainNetworkId.mainnet:
        return this.ethSDK.lockShares({ amount });

      case BlockchainNetworkId.smartchainTestnet:
      case BlockchainNetworkId.smartchain:
        return this.binanceSDK.lockShares({ amount });

      default:
        return undefined;
    }
  }

  public async unlockShares({
    chainId,
    amount,
    ratio,
  }: ISwitcherUnlockSharesArgs): Promise<IWeb3SendResult | undefined> {
    const value = amount
      .multipliedBy(ratio)
      .decimalPlaces(18, BigNumber.ROUND_HALF_DOWN);

    switch (chainId) {
      case BlockchainNetworkId.goerli:
      case BlockchainNetworkId.mainnet:
        return this.ethSDK.unlockShares({ amount: value });

      case BlockchainNetworkId.smartchainTestnet:
      case BlockchainNetworkId.smartchain:
        return this.binanceSDK.unlockShares({ amount });

      default:
        return undefined;
    }
  }

  public async addTokenToWallet({
    chainId,
    token,
  }: IAddTokenToWalletArgs): Promise<boolean> {
    switch (chainId) {
      case BlockchainNetworkId.goerli:
      case BlockchainNetworkId.mainnet:
        return this.ethSDK.addTokenToWallet(token);

      case BlockchainNetworkId.smartchainTestnet:
      case BlockchainNetworkId.smartchain:
        return this.binanceSDK.addTokenToWallet(token as TBnbSyntToken);

      default:
        return false;
    }
  }
}
