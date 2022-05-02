/* eslint-disable no-console */
import { ApiPromise, WsProvider } from '@polkadot/api';
import { SubmittableExtrinsic } from '@polkadot/api/types';
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
} from '@polkadot/extension-dapp';
import { InjectedWindow } from '@polkadot/extension-inject/types';
/* eslint-disable import/no-extraneous-dependencies */
import { encodeAddress } from '@polkadot/keyring';
/* eslint-enable import/no-extraneous-dependencies */
import { GenericExtrinsic } from '@polkadot/types/extrinsic';
import { SignedBlock } from '@polkadot/types/interfaces';
import { ISubmittableResult } from '@polkadot/types/types/extrinsic';
import { hexToU8a, isHex, u8aToHex } from '@polkadot/util';
import { blake2AsHex, decodeAddress } from '@polkadot/util-crypto';
import BigNumber from 'bignumber.js';
import { IProvider } from 'provider';
import PolkadotIcon from './assets/polkadot-icon.svg';
import {
  CURRENT_ENV,
  DEFAULT_WALLET_NAME,
  DEVELOP_ROCOCO_CONFIG,
  DEVELOP_WESTEND_CONFIG,
  ISlotAuctionConfig,
  MAINNET_KUSAMA_CONFIG,
  MAINNET_POLKADOT_CONFIG,
  STAGING_ROCOCO_CONFIG,
  STAGING_WESTEND_CONFIG,
} from './config';
import { EEnvTypes, TNetworkType, TPolkadotAddress } from './entity';

interface IConfig {
  polkadotUrl: string;
  networkType?: TNetworkType;
}

export interface IGetAccountBalanceData {
  free: BigNumber;
  feeFrozen: BigNumber;
  miscFrozen: BigNumber;
  nonce: BigNumber;
  reserved: BigNumber;
}

export interface ISwitchNetworkData {
  address: TPolkadotAddress;
  chainType: TNetworkType;
}

interface IWalletMeta {
  icon: string;
  id: string;
  name: string;
}

const PKG_ORIGIN_NAME = 'PolkadotProvider';

export class PolkadotProvider implements IProvider {
  static isInjected(): boolean {
    return (
      Object.keys((window as Window & InjectedWindow).injectedWeb3).length !== 0
    );
  }

  static isValidAddress(address: string): boolean {
    /**
     *  Note: https://polkadot.js.org/docs/util-crypto/examples/validate-address/
     */
    try {
      encodeAddress(
        isHex(address) ? hexToU8a(address) : decodeAddress(address),
      );

      return true;
    } catch {
      return false;
    }
  }

  static web3FromAddress(address: string) {
    return web3FromAddress(address);
  }

  protected currAccount: TPolkadotAddress | null = null;

  private api?: ApiPromise;

  private networkType?: TNetworkType;

  public get currentAccount(): TPolkadotAddress | null {
    return this.currAccount;
  }

  public set currentAccount(addr: TPolkadotAddress | null) {
    this.currAccount = addr;
  }

  public get currentNetworkType(): TNetworkType | undefined {
    return this.networkType;
  }

  public constructor(private config: IConfig) {
    this.networkType = config.networkType;
  }

  public getRawApi(): ApiPromise {
    if (!this.api) throw new Error(`Polkadot API is not initialized`);
    return this.api;
  }

  public getWalletMeta(): IWalletMeta {
    return {
      icon: PolkadotIcon,
      id: 'polkadot-js',
      name: DEFAULT_WALLET_NAME,
    };
  }

  public isAPIConnected(): boolean {
    return !!this.api;
  }

  public isConnected(): boolean {
    return PolkadotProvider.isInjected() && this.isAPIConnected();
  }

  public async connect(): Promise<void> {
    const extensions = await web3Enable(PKG_ORIGIN_NAME);

    if (!extensions.length) {
      throw new Error('There are no Polkadot extensions or available accounts');
    }

    const accounts = await this.getAccounts();
    console.log(`Found next polkadot accounts: ${accounts}`);

    if (!accounts.length) {
      throw new Error('There are no Polkadot accounts');
    }

    const wsProvider = new WsProvider(this.config.polkadotUrl);

    // eslint-disable-next-line prefer-destructuring
    this.currAccount = accounts[0];
    this.api = await ApiPromise.create({ provider: wsProvider });

    await this.getNetworkType();
  }

  public disconnect(): void {
    this.currAccount = null;
    this.api = undefined;
    this.networkType = this.config.networkType;
  }

  public async getNetworkType(): Promise<TNetworkType> {
    if (this.networkType) return this.networkType;
    const chainMapping: Record<string, TNetworkType> = {
      POLKADOT: 'DOT',
      KUSAMA: 'KSM',
      WESTEND: 'WND',
      ROCOCO: 'ROC',
    };
    const wsProvider = new WsProvider(this.config.polkadotUrl);
    const api = await ApiPromise.create({ provider: wsProvider });
    const chainName = await api.rpc.system.chain();
    if (!chainMapping[chainName.toUpperCase()]) {
      throw new Error(`Not supported polkadot chain: ${chainName}`);
    }
    this.networkType = chainMapping[chainName.toUpperCase()];
    return this.networkType;
  }

  private _scaleUp(value: BigNumber): BigNumber {
    return value.multipliedBy(10 ** this.calcDecimals());
  }

  private _scaleDown(value: BigNumber): BigNumber {
    return value.dividedBy(10 ** this.calcDecimals());
  }

  public calcDecimals(): number {
    const decimals: Record<TNetworkType, number> = {
      DOT: 10,
      KSM: 12,
      WND: 12,
      ROC: 12,
    };
    if (!this.networkType || !decimals[this.networkType]) {
      throw new Error(
        `Unable to calc decimals for network: ${this.networkType}`,
      );
    }
    return decimals[this.networkType];
  }

  public async getAccountBalance(
    address: TPolkadotAddress,
  ): Promise<IGetAccountBalanceData> {
    const { nonce, data } = await this.getRawApi().query.system.account(
      address,
    );
    return {
      reserved: this._scaleDown(new BigNumber(data.reserved.toString(10))),
      miscFrozen: this._scaleDown(new BigNumber(data.miscFrozen.toString(10))),
      free: this._scaleDown(new BigNumber(data.free.toString(10))),
      feeFrozen: this._scaleDown(new BigNumber(data.feeFrozen.toString(10))),
      nonce: new BigNumber(nonce.toString()),
    };
  }

  public getMinSafeDepositVal(): BigNumber {
    const api: ApiPromise = this.getRawApi();

    return this._scaleDown(
      new BigNumber(api.consts.balances.existentialDeposit.toString()),
    );
  }

  public async sendFundsWithExtrinsic(
    sender: string,
    recipient: string,
    amount: BigNumber,
  ): Promise<{
    extId: string;
    transactionHash: string;
    blockHash: string;
  }> {
    const { blockHash, transactionHash } = await this.sendFundsTo(
      sender,
      recipient,
      amount,
    );
    const { extId } = await this.getExtrinsicIndexByHash(
      transactionHash,
      blockHash,
    );
    return { transactionHash, blockHash, extId };
  }

  public async sendSystemRemarkWithExtrinsic(
    sender: string,
    data: Uint8Array,
  ): Promise<{
    extId: string;
    transactionHash: string;
    blockHash: string;
  }> {
    const { blockHash, transactionHash } = await this.sendSystemRemark(
      sender,
      data,
    );
    const { extId } = await this.getExtrinsicIndexByHash(
      transactionHash,
      blockHash,
    );
    return { transactionHash, blockHash, extId };
  }

  public async switchNetwork(
    networkType: TNetworkType,
  ): Promise<ISwitchNetworkData> {
    let config: ISlotAuctionConfig | undefined;

    switch (networkType) {
      case 'DOT':
        config = MAINNET_POLKADOT_CONFIG;
        break;

      case 'KSM':
        config = MAINNET_KUSAMA_CONFIG;
        break;

      case 'WND':
        config =
          CURRENT_ENV === EEnvTypes.Stage
            ? STAGING_WESTEND_CONFIG
            : DEVELOP_WESTEND_CONFIG;
        break;

      case 'ROC':
        config =
          CURRENT_ENV === EEnvTypes.Stage
            ? STAGING_ROCOCO_CONFIG
            : DEVELOP_ROCOCO_CONFIG;
        break;

      default:
        break;
    }

    if (typeof config === 'undefined') {
      throw new Error(`Not supported Polkadot network type: ${networkType}`);
    }

    const [firstAddress] = await this.getAccounts();

    if (typeof firstAddress !== 'string') {
      throw new Error('There is no Polkadot account');
    }

    this.config = {
      polkadotUrl: config.polkadotUrl,
      networkType: config.networkType,
    };

    this.currAccount = firstAddress;

    this.api = await ApiPromise.create({
      provider: new WsProvider(config.polkadotUrl),
    });

    this.networkType = config.networkType as TNetworkType;

    return {
      address: this.currAccount,
      chainType: this.networkType,
    };
  }

  public async getMaxPossibleSendAmount(
    sender: string,
    recipient: string,
    amount: BigNumber,
  ): Promise<BigNumber> {
    const injector = await web3FromAddress(sender);
    if (!injector) {
      throw new Error(
        `Unable to connect to Polkadot extension using address: ${sender}`,
      );
    }
    const api = this.getRawApi();
    const transferCall = api.tx.balances.transferKeepAlive(
      recipient,
      this._scaleUp(amount).toString(10),
    );
    const signerOptions = {
      nonce: -1,
    };
    const paymentInfoResult = await transferCall.paymentInfo(
      sender,
      signerOptions,
    );
    console.log(
      `Payment info result: ${JSON.stringify(paymentInfoResult, null, 2)}`,
    );
    const { free, miscFrozen } = await this.getAccountBalance(sender);
    const minSafeDepositVal: BigNumber = this.getMinSafeDepositVal();
    const fee = this._scaleDown(
      new BigNumber(paymentInfoResult.partialFee.toString()),
    );
    const result: BigNumber = new BigNumber(free)
      .minus(minSafeDepositVal)
      .minus(miscFrozen)
      .minus(fee);
    console.log(
      `Max transferable balance: ${free} - ${minSafeDepositVal} - ${miscFrozen} - ${fee} = ${result}`,
    );
    return result.isLessThanOrEqualTo(0) ? new BigNumber(0) : result;
  }

  public async sendSystemRemark(
    sender: string,
    data: Uint8Array,
  ): Promise<{
    submittableResult: ISubmittableResult;
    blockHash: string;
    transactionHash: string;
  }> {
    const injector = await web3FromAddress(sender);
    if (!injector || !injector.signer.signRaw)
      throw new Error(
        `Unable to connect to Polkadot extension using address: ${sender}`,
      );
    const api = this.getRawApi();
    api.setSigner(injector.signer);

    console.log(`Creating system.remark from ${sender} with data ${data}`);

    const remarkCall = api.tx.system.remark(u8aToHex(data));
    const signerOptions = {
      nonce: -1,
    };
    let signedExtrinsic: SubmittableExtrinsic<'promise'> | undefined;
    try {
      signedExtrinsic = await remarkCall.signAsync(sender, signerOptions);
    } catch (e: any) {
      throw new Error(e);
    }

    return PolkadotProvider.sendSignedExtrinsic(api, signedExtrinsic);
  }

  public async sendFundsTo(
    sender: string,
    recipient: string,
    amount: BigNumber,
  ): Promise<{
    submittableResult: ISubmittableResult;
    blockHash: string;
    transactionHash: string;
  }> {
    const maxPossibleAmount = await this.getMaxPossibleSendAmount(
      sender,
      recipient,
      amount,
    );
    if (amount.isGreaterThan(maxPossibleAmount)) {
      throw new Error(
        `Not enough funds to pay transaction fee and keep account alive, max sending amount is ${maxPossibleAmount.toString(
          10,
        )}`,
      );
    }
    const injector = await web3FromAddress(sender);
    if (!injector || !injector.signer.signRaw)
      throw new Error(
        `Unable to connect to Polkadot extension using address: ${sender}`,
      );
    const api = this.getRawApi();
    api.setSigner(injector.signer);

    console.log(
      `Creating transaction from ${sender} to ${recipient} amount ${amount}`,
    );

    const transferCall = api.tx.balances.transferKeepAlive(
      recipient,
      this._scaleUp(amount).toString(10),
    );
    const signerOptions = {
      nonce: -1,
    };
    let signedExtrinsic: SubmittableExtrinsic<'promise'> | undefined;
    try {
      signedExtrinsic = await transferCall.signAsync(sender, signerOptions);
    } catch (e: any) {
      throw new Error(e);
    }

    return PolkadotProvider.sendSignedExtrinsic(api, signedExtrinsic);
  }

  public async getExtrinsicIndexByHash(
    transactionHash: string,
    blockHash: string,
  ): Promise<{
    extrinsic: GenericExtrinsic;
    extId: string;
    signedBlock: SignedBlock;
    indexAt: number;
  }> {
    const signedBlock = await this.getRawApi().rpc.chain.getBlock(blockHash);
    const blockTxs = signedBlock.block.extrinsics.toArray();
    const indexAt = blockTxs.findIndex(
      signedExtrinsic =>
        blake2AsHex(signedExtrinsic.toU8a(false), 256) === transactionHash,
    );
    if (indexAt === -1)
      throw new Error(
        `Unable to find extrinsic by hash ${transactionHash} in block ${blockHash}`,
      );
    // TODO Please to resolve issues with that
    return {
      // @ts-ignore
      extrinsic: blockTxs[indexAt],
      extId: `${signedBlock.block.header.number}-${indexAt}`,
      // @ts-ignore
      signedBlock,
      indexAt,
    };
  }

  public async getAccounts(): Promise<string[]> {
    const ss58Formats: Record<TNetworkType, number> = {
      DOT: 0,
      KSM: 2,
      WND: 42,
      ROC: 42,
    };
    let ss58Format = 42;
    // eslint-disable-next-line no-prototype-builtins
    if (ss58Formats.hasOwnProperty(this.networkType as TNetworkType)) {
      ss58Format = ss58Formats[this.networkType as TNetworkType];
    }
    const accountsMeta = await web3Accounts({
      ss58Format,
    });
    return accountsMeta.map(meta => meta.address);
  }

  public async signRawMessage(
    account: string,
    hexData: string,
  ): Promise<string> {
    const injector = await web3FromAddress(account);
    if (!injector || !injector.signer.signRaw)
      throw new Error(
        `Unable to connect to Polkadot extension using address: ${account}`,
      );
    const { signature } = await injector.signer.signRaw({
      type: 'bytes',
      address: account,
      data: hexData,
    });
    console.log(`Signed message: ${hexData} with signature: ${signature}`);
    return signature;
  }

  private static async sendSignedExtrinsic(
    api: ApiPromise,
    signedExtrinsic: SubmittableExtrinsic<'promise'>,
  ): Promise<{
    submittableResult: ISubmittableResult;
    blockHash: string;
    transactionHash: string;
  }> {
    /**
     *  @Note:
     *    This is an anti-pattern: https://stackoverflow.com/questions/43036229/is-it-an-anti-pattern-to-use-async-await-inside-of-a-new-promise-constructor
     *    A quick fix is a "solution" for reducing influence of possible errors with transaction sending and unsubscription
     */
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const transactionHash = blake2AsHex(signedExtrinsic.toU8a(false), 256);
        console.log(`Transaction hash (calculated): ${transactionHash}`);
        const unsub = await signedExtrinsic.send(
          // TODO Please to resolve the issue with this line
          // @ts-ignore
          (result: ISubmittableResult) => {
            const { events = [], status, dispatchError } = result;
            console.log('Transaction status:', status.type);
            if (dispatchError) {
              let errorMessage = dispatchError.toString();
              if (dispatchError.isModule) {
                const decoded = api.registry.findMetaError(
                  dispatchError.asModule,
                );
                const { docs, name, section } = decoded as any;
                errorMessage = `${section}.${name}: ${docs.join(' ')}`;
              }
              console.log(
                `Decoded module transaction error is: ${errorMessage}`,
              );
              unsub();
              reject(new Error(errorMessage));
            }
            if (status.isInBlock) {
              console.log('Included at block hash', status.asInBlock.toHex());
              console.log('Events:');
              events.forEach(({ event: { data, method, section }, phase }) => {
                console.log(
                  '\t',
                  phase.toString(),
                  `: ${section}.${method}`,
                  data.toString(),
                );
              });
            } else if (status.isFinalized) {
              console.log('Finalized block hash', status.asFinalized.toHex());
              unsub();
              resolve({
                submittableResult: result,
                blockHash: status.asFinalized.toHex(),
                transactionHash,
              });
            } else if (status.isDropped) {
              unsub();
              reject(new Error('Transaction has been dropped'));
            }
          },
        );
      } catch (e: any) {
        reject(new Error(e));
      }
    });
  }

  public static extractDecodedAddress(address: TPolkadotAddress): Uint8Array {
    return decodeAddress(address);
  }

  public static extractPublicKeyHexFromAddress(
    address: TPolkadotAddress,
  ): string {
    return Buffer.from(decodeAddress(address)).toString('hex');
  }
}
