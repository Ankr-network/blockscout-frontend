/* eslint-disable no-console */
import Common from '@ethereumjs/common';
import { Transaction } from '@ethereumjs/tx';
import BigNumber from 'bignumber.js';
import { BN } from 'ethereumjs-util';
import Web3 from 'web3';
import {
  AbstractProvider,
  HttpProvider,
  PromiEvent,
  provider as Provider,
  TransactionReceipt,
  WebsocketProvider,
} from 'web3-core';
import { Contract } from 'web3-eth-contract';
import { numberToHex } from 'web3-utils';
import { getProviderInfo } from 'web3modal';

export interface IWalletMeta {
  description?: string;
  icons: string[] | null;
  name: string;
  url?: string;
}

export interface IWeb3SendResult {
  receiptPromise: PromiEvent<TransactionReceipt>;
  transactionHash: string;
  rawTransaction: string;
}

export abstract class Web3KeyProvider {
  protected accounts: string[] = [];

  protected currentAccount: string | null = null;

  protected currentChain = 0;

  protected provider: Provider = null;

  protected web3: Web3 | null = null;

  private walletMeta: IWalletMeta | undefined;

  public abstract inject(): Promise<void>;

  public isConnected(): boolean {
    return !!this.web3;
  }

  public getCurrentAccount(): string {
    if (!this.currentAccount) {
      throw new Error('Wallet is not activated');
    }

    return this.currentAccount;
  }

  public getCurrentChain(): number {
    if (!this.currentChain) {
      throw new Error(`Web3 is not connected`);
    }

    return this.currentChain;
  }

  public async getErc20Balance(
    contract: Contract,
    address: string,
  ): Promise<BigNumber> {
    let balance = 0;
    try {
      balance = await contract.methods.balanceOf(address).call();
    } catch (error) {
      throw new Error(`Unable to get contract balance: ${error}`);
    }
    let decimals = 18;
    try {
      decimals = await contract.methods.decimals().call();
      if (!Number(decimals)) {
        decimals = 18;
      }
    } catch (e) {
      throw new Error(`Unable to calculate contract decimals: ${e}`);
    }
    return new BigNumber(`${balance}`).dividedBy(
      new BigNumber(10).pow(decimals),
    );
  }

  public async getTokenBalance(
    contract: Contract,
    address: string,
  ): Promise<BigNumber> {
    const balance = await contract.methods.balanceOf(address).call();
    let decimals = 18;
    try {
      decimals = await contract.methods.decimals().call();
      if (!Number(decimals)) {
        decimals = 18;
      }
    } catch (e) {
      throw new Error(`Unable to calculate contract decimals: ${e}`);
    }
    return new BigNumber(`${balance}`).dividedBy(
      new BigNumber(10).pow(decimals),
    );
  }

  public getWalletMeta(): IWalletMeta {
    if (!this.isConnected()) {
      throw new Error('Provider must be connected');
    }
    return this.walletMeta;
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
    this.setWalletMeta();
    await this.getUnlockedAccounts(web3);
  }

  public createContract(abi: any, address: string): Contract {
    const web3 = this.getWeb3();
    return new web3.eth.Contract(abi, address);
  }

  public disconnect(): void {
    this.web3 = null;
    this.currentAccount = null;
    this.accounts = [];
    this.currentChain = 0;

    // trying to really disconnect provider
    if (this.provider) {
      const isProviderHasDisconnect =
        typeof (this.provider as HttpProvider).disconnect === 'function';

      const isProviderHasReset =
        typeof (this.provider as WebsocketProvider).reset === 'function';

      if (isProviderHasReset) {
        (this.provider as WebsocketProvider).reset();
      }
      if (isProviderHasDisconnect) {
        (this.provider as HttpProvider).disconnect();
      }

      this.provider = null;
    }
  }

  public async sendTransactionAsync(
    from: string,
    to: string,
    sendOptions: {
      data?: string;
      gasLimit?: string;
      value?: string;
      estimate?: boolean;
      nonce?: number;
    },
  ): Promise<IWeb3SendResult> {
    const gasPrice = await this.getWeb3().eth.getGasPrice();

    console.log(`Gas Price: ${gasPrice}`);

    let { nonce } = sendOptions;

    if (!nonce) {
      nonce = await this.getWeb3().eth.getTransactionCount(from);
    }

    console.log(`Nonce: ${nonce}`);

    const tx = {
      from,
      to,
      value: numberToHex(sendOptions.value || '0'),
      gas: numberToHex(sendOptions.gasLimit || '500000'),
      gasPrice,
      data: sendOptions.data,
      nonce,
      chainId: this.currentChain,
    };

    console.log('Sending transaction via Web3: ', tx);

    return new Promise((resolve, reject) => {
      const promise = this.getWeb3().eth.sendTransaction(tx);

      promise
        .once('transactionHash', async (transactionHash: string) => {
          console.log(`Just signed transaction has is: ${transactionHash}`);

          const rawTx = await this.getWeb3().eth.getTransaction(
            transactionHash,
          );

          console.log(
            `Found transaction in node: `,
            JSON.stringify(rawTx, null, 2),
          );

          let rawTxHex = '';

          try {
            rawTxHex = this.tryGetRawTx(rawTx);
          } catch (e) {
            console.error(`Failed to get raw transaction: ${e.message}`);
          }

          resolve({
            receiptPromise: promise,
            transactionHash,
            rawTransaction: rawTxHex,
          });
        })
        .catch(reject);
    });
  }

  public async watchAsset(config: {
    type: 'ERC20';
    address: string;
    symbol: string;
    decimals?: number;
    image?: string;
  }): Promise<void> {
    const web3 = this.getWeb3();
    const ethereum = web3.currentProvider as AbstractProvider;
    const params = {
      type: config.type,
      options: {
        address: config.address,
        symbol: config.symbol,
        decimals: config.decimals,
        image: config.image,
      },
    };

    const success = await ethereum.request({
      method: 'wallet_watchAsset',
      params,
    });

    if (!success) {
      throw new Error(`Failed to watch asset, something went wrong`);
    }
  }

  private async getUnlockedAccounts(web3: Web3): Promise<string[]> {
    let unlockedAccounts: string[] = [];
    try {
      unlockedAccounts = await web3.eth.getAccounts();
    } catch (e) {
      throw new Error('User denied access to account');
    }
    const [currentAccount] = unlockedAccounts;
    if (!unlockedAccounts.length || !currentAccount) {
      throw new Error('Unable to detect unlocked MetaMask account');
    }
    this.currentAccount = currentAccount;
    this.accounts = unlockedAccounts;
    return unlockedAccounts;
  }

  private setWalletMeta() {
    const provider = this.provider as any;
    if (!this.isConnected() || !provider) {
      return;
    }

    if (provider.walletMeta) {
      this.walletMeta = provider.walletMeta as IWalletMeta;
    } else {
      const { logo, name } = getProviderInfo(provider);

      this.walletMeta = {
        name,
        icons: [logo],
      };
    }
  }

  private tryGetRawTx(rawTx: any): string {
    if (!Common.isSupportedChainId(new BN(this.currentChain))) {
      console.warn(
        `raw tx can't be created for this chain id ${this.currentChain}`,
      );
      return '';
    }

    const { v, r, s } = rawTx; /* this fields are not-documented */

    const newTx = new Transaction(
      {
        gasLimit: this.getWeb3().utils.numberToHex(rawTx.gas),
        gasPrice: this.getWeb3().utils.numberToHex(Number(rawTx.gasPrice)),
        to: `${rawTx.to}`,
        nonce: this.getWeb3().utils.numberToHex(rawTx.nonce),
        data: rawTx.input,
        v,
        r,
        s,
        value: this.getWeb3().utils.numberToHex(rawTx.value),
      },
      {
        common: Common.custom({}, { baseChain: this.currentChain }),
      },
    );

    if (!newTx.verifySignature()) {
      throw new Error(`The signature is not valid for this transaction`);
    }

    console.log(`New Tx: `, JSON.stringify(newTx, null, 2));

    const rawTxHex = newTx.serialize().toString('hex');

    console.log(`Raw transaction hex is: `, rawTxHex);

    return rawTxHex;
  }
}
