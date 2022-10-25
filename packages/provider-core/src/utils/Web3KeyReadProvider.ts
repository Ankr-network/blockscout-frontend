import { CoinbaseWalletProvider } from '@coinbase/wallet-sdk';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import {
  AbstractProvider,
  HttpProvider,
  provider as Provider,
  WebsocketProvider,
} from 'web3-core';
import { Contract } from 'web3-eth-contract';
import { IProvider } from './types';

const ADDITIONAL_SAFE_GAS_PRICE_WEI = 25_000;

export type TWeb3Call<T> = (callback: TWeb3BatchCallback<T>) => T;

export type TWeb3BatchCallback<T> = (err: Error | null, data: T) => void;

export abstract class Web3KeyReadProvider implements IProvider {
  protected _currentChain = 0;

  protected provider: Provider = null;

  protected web3: Web3 | null = null;

  public static isInjected(): boolean {
    return typeof window.ethereum !== 'undefined';
  }

  public isConnected(): boolean {
    return !!this.web3;
  }

  public get currentChain(): number {
    if (!this._currentChain) {
      throw new Error(`Web3 is not connected`);
    }
    return this._currentChain;
  }

  public set currentChain(chainId) {
    this._currentChain = chainId;
  }

  public getFormattedBalance(
    balance: BigNumber.Value,
    decimals: BigNumber.Value,
  ): BigNumber {
    return new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals));
  }

  public async getErc20Balance(
    contract: Contract,
    address: string,
  ): Promise<BigNumber> {
    const balance = await contract.methods.balanceOf(address).call();

    let decimals = await contract.methods.decimals().call();
    if (!Number(decimals)) {
      decimals = 18;
    }
    return this.getFormattedBalance(balance, decimals);
  }

  public async getTokenBalance(
    contract: Contract,
    address: string,
  ): Promise<BigNumber> {
    const balance = await contract.methods.balanceOf(address).call();
    let decimals = await contract.methods.decimals().call();
    if (!Number(decimals)) {
      decimals = 18;
    }

    return this.getFormattedBalance(balance, decimals);
  }

  public getWeb3(): Web3 {
    if (!this.web3) {
      throw new Error('Web3 must be initialized');
    }

    return this.web3;
  }

  public async connect(): Promise<void> {
    const web3 = this.getWeb3();
    this.currentChain = await web3.eth.getChainId();
  }

  public createContract(abi: any, address: string): Contract {
    const web3 = this.getWeb3();
    return new web3.eth.Contract(abi, address);
  }

  public disconnect(): void {
    this.web3 = null;

    this.currentChain = 0;

    // trying to really disconnect provider
    if (this.provider) {
      const isProviderHasDisconnect =
        typeof (this.provider as HttpProvider).disconnect === 'function';

      const isProviderHasReset =
        typeof (this.provider as WebsocketProvider).reset === 'function';

      const isProviderHasClose =
        typeof (this.provider as CoinbaseWalletProvider).close === 'function';

      if (isProviderHasReset) {
        (this.provider as WebsocketProvider).reset();
      }

      if (isProviderHasDisconnect) {
        (this.provider as HttpProvider).disconnect();
      }

      if (isProviderHasClose) {
        (this.provider as CoinbaseWalletProvider).close();
      }

      this.provider = null;
    }
  }

  public async watchAsset(config: {
    type: 'ERC20';
    address: string;
    symbol: string;
    decimals?: number;
    image?: string;
  }): Promise<void> {
    const web3 = this.getWeb3();
    const ethereum = web3.currentProvider as AbstractProvider | undefined;

    if (!ethereum) {
      throw new Error(`Failed to watch asset, there is no current provider`);
    }

    const params = {
      type: config.type,
      options: {
        address: config.address,
        symbol: config.symbol,
        decimals: config.decimals,
        image: config.image,
      },
    };

    const success = await ethereum.request?.({
      method: 'wallet_watchAsset',
      params,
    });

    if (!success) {
      throw new Error(`Failed to watch asset, something went wrong`);
    }
  }

  /**
   * `executeBatchCalls` is supposed to decrease calls to blockchain.
   * It only sends one request and returns data from each call.
   *
   * @param calls web3 calls
   * @returns array of return values from web3 calls
   */
  public async executeBatchCalls<T>(calls: TWeb3Call<T>[]): Promise<T[]> {
    const web3 = this.getWeb3();
    const batch = new web3.eth.BatchRequest();

    const promises = calls.map(
      call =>
        new Promise<T>((res, rej) => {
          const callback: TWeb3BatchCallback<T> = (err, data) =>
            err ? rej(err) : res(data);

          // @ts-ignore https://github.com/ChainSafe/web3.js/issues/4655
          batch.add(call(callback));
        }),
    );

    batch.execute();

    return Promise.all(promises);
  }

  public async getContractMethodFee(
    methodEstimateGas: number,
  ): Promise<BigNumber> {
    const rawGasPriceWei: BigNumber = await this.getSafeGasPriceWei();
    const gasPrice = this.getWeb3().utils.fromWei(rawGasPriceWei.toString());

    return new BigNumber(gasPrice).multipliedBy(methodEstimateGas);
  }

  public async getSafeGasPriceWei(): Promise<BigNumber> {
    const pureGasPriceWei = await this.getWeb3().eth.getGasPrice();

    return new BigNumber(pureGasPriceWei).plus(ADDITIONAL_SAFE_GAS_PRICE_WEI);
  }

  // TODO Cache
  public async getBlockNumber() {
    if (!this.web3) {
      throw new Error("web3 isn't defined");
    }

    return this.web3.eth.getBlockNumber();
  }
}
