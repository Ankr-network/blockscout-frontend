import BigNumber from 'bignumber.js';

import {
  AvailableWriteProviders,
  BlockchainNetworkId,
  IWeb3SendResult,
} from 'provider';

import { EthSDK } from 'modules/api/EthSDK';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import {
  IFetchTxData,
  IFetchTxReceiptData,
  ISwitcher,
} from 'modules/api/switcher';
import { Token } from 'modules/common/types/token';
import { BinanceSDK } from 'modules/stake-bnb/api/BinanceSDK';
import { FantomSDK } from 'modules/stake-fantom/api/sdk';
import { PolygonSDK } from 'modules/stake-polygon/api/PolygonSDK';

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

  private account: string;

  private constructor({
    binanceSDK,
    ethSDK,
    maticSDK,
    fantomSDK,
    account,
  }: ISwitcherSDKArgs) {
    this.binanceSDK = binanceSDK;
    this.ethSDK = ethSDK;
    this.maticSDK = maticSDK;
    this.fantomSDK = fantomSDK;
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
      const [binanceSDK, ethSDK, maticSDK, fantomSDK] = await Promise.all([
        BinanceSDK.getInstance(),
        EthSDK.getInstance(),
        PolygonSDK.getInstance(),
        FantomSDK.getInstance(),
      ]);

      SwitcherSDK.instance = new SwitcherSDK({
        binanceSDK,
        ethSDK,
        maticSDK,
        fantomSDK,
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
      .decimalPlaces(DEFAULT_DECIMALS, BigNumber.ROUND_HALF_DOWN);

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

    switch (chainId) {
      case BlockchainNetworkId.goerli:
      case BlockchainNetworkId.mainnet:
        return ethSdkByToken[token];

      case BlockchainNetworkId.smartchainTestnet:
      case BlockchainNetworkId.smartchain:
        return binanceSdkByToken[token];

      case BlockchainNetworkId.fantomTestnet:
      case BlockchainNetworkId.fantom:
        return fantomSdkByToken[token];

      default:
        return undefined;
    }
  }
}
