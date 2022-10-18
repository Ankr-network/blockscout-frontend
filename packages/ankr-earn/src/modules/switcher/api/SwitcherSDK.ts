import {
  AvailableWriteProviders,
  EEthereumNetworkId,
  IWeb3SendResult,
} from '@ankr.com/provider-core';
import BigNumber from 'bignumber.js';

import {
  AvalancheSDK,
  BinanceSDK,
  EthereumSDK,
  FantomSDK,
  IFetchTxData,
  IFetchTxReceiptData,
  ISwitcher,
  PolygonOnEthereumSDK,
  ProviderManagerSingleton,
} from '@ankr.com/staking-sdk';

import { Token } from 'modules/common/types/token';

import { AvailableSwitcherToken, AvailableSwitchNetwork } from '../const';

import {
  ISwitcherSDKArgs,
  ISwitcherCommonDataArgs,
  ISwitcherCommonData,
  ISwitcherApproveArgs,
  ISwitcherLockSharesArgs,
  ISwitcherUnlockSharesArgs,
  IFetchTxDataArgs,
  IFetchTxReceiptArgs,
  IAddTokenToWalletArgs,
} from './types';

const DEFAULT_DECIMALS = 18;

export class SwitcherSDK {
  private static instance: SwitcherSDK;

  private binanceSDK: ISwitcher;

  private ethSDK: ISwitcher;

  private maticSDK: ISwitcher;

  private fantomSDK: ISwitcher;

  private avaxSDK: ISwitcher;

  private account: string;

  private constructor({
    binanceSDK,
    ethSDK,
    maticSDK,
    fantomSDK,
    avaxSDK,
    account,
  }: ISwitcherSDKArgs) {
    this.binanceSDK = binanceSDK;
    this.ethSDK = ethSDK;
    this.maticSDK = maticSDK;
    this.fantomSDK = fantomSDK;
    this.avaxSDK = avaxSDK;
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
      const [binanceSDK, ethSDK, maticSDK, fantomSDK, avaxSDK] =
        await Promise.all([
          BinanceSDK.getInstance(),
          EthereumSDK.getInstance(),
          PolygonOnEthereumSDK.getInstance(),
          FantomSDK.getInstance(),
          AvalancheSDK.getInstance(),
        ]);

      SwitcherSDK.instance = new SwitcherSDK({
        binanceSDK,
        ethSDK,
        maticSDK,
        fantomSDK,
        avaxSDK,
        account,
      });
    }

    return SwitcherSDK.instance;
  }

  public async getCommonData({
    chainId,
    token,
  }: ISwitcherCommonDataArgs): Promise<ISwitcherCommonData | undefined> {
    const sdk = this.getSdk(chainId, token);

    if (!sdk) {
      return undefined;
    }

    const [abBalance, acBalance, ratio, allowance] = await Promise.all([
      sdk.getABBalance(true),
      sdk.getACBalance(true),
      sdk.getACRatio(true),
      sdk.getACAllowance(),
    ]);

    return { abBalance, acBalance, ratio, allowance };
  }

  public async fetchTxData({
    chainId,
    txHash,
    token,
  }: IFetchTxDataArgs): Promise<IFetchTxData | undefined> {
    const sdk = this.getSdk(chainId, token);

    return sdk?.fetchTxData(txHash);
  }

  public async fetchTxReceipt({
    chainId,
    txHash,
    token,
  }: IFetchTxReceiptArgs): Promise<IFetchTxReceiptData | undefined> {
    const sdk = this.getSdk(chainId, token);

    return sdk?.fetchTxReceipt(txHash);
  }

  public async approve({
    chainId,
    amount,
    token,
  }: ISwitcherApproveArgs): Promise<IWeb3SendResult | undefined> {
    const sdk = this.getSdk(chainId, token);

    return sdk?.approveACForAB(amount);
  }

  public async lockShares({
    chainId,
    amount,
    token,
  }: ISwitcherLockSharesArgs): Promise<IWeb3SendResult | undefined> {
    const sdk = this.getSdk(chainId, token);

    return sdk?.lockShares({ amount });
  }

  public async unlockShares({
    chainId,
    amount,
    ratio,
    token,
  }: ISwitcherUnlockSharesArgs): Promise<IWeb3SendResult | undefined> {
    const sdk = this.getSdk(chainId, token);
    const value = amount
      .multipliedBy(ratio)
      .decimalPlaces(DEFAULT_DECIMALS, BigNumber.ROUND_DOWN);

    return sdk?.unlockShares({ amount: value });
  }

  public async addTokenToWallet({
    chainId,
    token,
  }: IAddTokenToWalletArgs): Promise<boolean> {
    const sdk = this.getSdk(chainId, token);

    return sdk?.addTokenToWallet(token) ?? false;
  }

  private getSdk(
    chainId: AvailableSwitchNetwork,
    token: AvailableSwitcherToken,
  ): ISwitcher | undefined {
    const ethSdkByToken: Record<string, ISwitcher> = {
      [Token.aETHb]: this.ethSDK,
      [Token.aETHc]: this.ethSDK,
      [Token.aMATICb]: this.maticSDK,
      [Token.aMATICc]: this.maticSDK,
    };

    const binanceSdkByToken: Record<string, ISwitcher> = {
      [Token.aBNBb]: this.binanceSDK,
      [Token.aBNBc]: this.binanceSDK,
    };

    const fantomSdkByToken: Record<string, ISwitcher> = {
      [Token.aFTMb]: this.fantomSDK,
      [Token.aFTMc]: this.fantomSDK,
    };

    const avaxSdkByToken: Record<string, ISwitcher> = {
      [Token.aAVAXb]: this.avaxSDK,
      [Token.aAVAXc]: this.avaxSDK,
    };

    switch (chainId) {
      case EEthereumNetworkId.goerli:
      case EEthereumNetworkId.mainnet:
        return ethSdkByToken[token];

      case EEthereumNetworkId.smartchainTestnet:
      case EEthereumNetworkId.smartchain:
        return binanceSdkByToken[token];

      case EEthereumNetworkId.fantomTestnet:
      case EEthereumNetworkId.fantom:
        return fantomSdkByToken[token];

      case EEthereumNetworkId.avalanche:
      case EEthereumNetworkId.avalancheTestnet:
        return avaxSdkByToken[token];

      default:
        return undefined;
    }
  }
}
