/* eslint-disable no-console */
import Common from '@ethereumjs/common';
import { Transaction } from '@ethereumjs/tx';
import { BN } from 'ethereumjs-util';
import Web3 from 'web3';
import { AbstractProvider, PromiEvent, TransactionReceipt } from 'web3-core';
import { numberToHex } from 'web3-utils';
import { getProviderInfo } from 'web3modal';
import { RPCConfig } from './const';
import { Web3KeyReadProvider } from './Web3KeyReadProvider';

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

export interface ITokenInfo {
  address: string;
  symbol?: string;
  decimals?: number;
  image?: string;
}

export abstract class Web3KeyProvider extends Web3KeyReadProvider {
  private walletMeta: IWalletMeta | undefined;

  protected accounts: string[] = [];

  protected _currentAccount: string | null = null;

  public abstract inject(): Promise<void>;

  public get currentAccount(): string {
    if (!this._currentAccount) {
      throw new Error('Wallet is not activated');
    }
    return this._currentAccount;
  }

  public set currentAccount(addr: string | null) {
    this._currentAccount = addr;
  }

  public getWalletMeta(): IWalletMeta {
    if (!this.isConnected()) {
      throw new Error('Provider must be connected');
    }

    return this.walletMeta as IWalletMeta;
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

  public async connect(): Promise<void> {
    const web3 = this.getWeb3();
    super.connect();
    this.setWalletMeta();
    await this.getUnlockedAccounts(web3);
  }

  public disconnect(): void {
    super.disconnect();
    this.currentAccount = null;
    this.accounts = [];
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
            const { message } = e as { message?: string };
            console.error(`Failed to get raw transaction: ${message}`);
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
        to: rawTx.to,
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

  public addTokenToWallet(tokenInfo: ITokenInfo): Promise<boolean> {
    const provider = this.provider as AbstractProvider;

    const isProviderHasRequest =
      !!provider && typeof provider.request === 'function';

    if (!isProviderHasRequest) {
      throw new Error('This provider does not support the adding new tokens');
    }

    return provider.request!({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: tokenInfo,
      },
    }).catch();
  }

  public async switchNetwork(chainId: number): Promise<any> {
    const config = RPCConfig[chainId];
    const provider = this.provider as AbstractProvider | undefined;

    const isProviderHasRequest =
      !!provider && typeof provider.request === 'function';

    if (!isProviderHasRequest) {
      throw new Error(
        'This provider does not support the network switching method',
      );
    }

    try {
      return await provider.request?.({
        /**
         * Method [API](https://docs.metamask.io/guide/rpc-api.html#wallet-switchethereumchain)
         */
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: config.chainId }],
      });
    } catch (switchError) {
      const isChainNotAdded =
        (switchError as { code?: number | string }).code === 4902;

      if (isChainNotAdded) {
        return provider
          .request?.({
            /**
             * Method [API](https://docs.metamask.io/guide/rpc-api.html#wallet-addethereumchain)
             */
            method: 'wallet_addEthereumChain',
            params: [config],
          })
          .catch(() => {
            throw new Error('addError');
          });
      }
      // handle other "switch" errors
      throw new Error(
        'Switch network error. Perhaps the network is not added to the RPC Config.',
      );
    }
  }
}
