import { BscConnector } from '@binance-chain/bsc-connector';
import { alpha, lighten } from '@material-ui/core';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { BigNumber } from 'bignumber.js';
import { Transaction } from 'ethereumjs-tx';
import { EventEmitter } from 'events';
import { BlockchainNetworkId } from 'modules/common/types';
import { sleep } from 'modules/common/utils/sleep';
import { PALETTE } from 'modules/themes/mainTheme';
import Web3 from 'web3';
import { PromiEvent, TransactionReceipt } from 'web3-core';
import { Contract } from 'web3-eth-contract';
import { AbiItem, bytesToHex, numberToHex } from 'web3-utils';
import Web3Modal, {
  getProviderInfo,
  ICoreOptions,
  IProviderOptions,
} from 'web3modal';
import binanceWalletLogo from './assets/binanceWallet.svg';
import huobiLogo from './assets/huobi.svg';
import imTokenLogo from './assets/imToken.svg';
import mathLogo from './assets/math.svg';
import trustWalletLogo from './assets/trust.svg';
import { RPCConfig } from './config';
import { KeyProviderEvents } from './event';

export interface IProviderConfig {
  ethereumChainId: BlockchainNetworkId;
  binanceChainId: BlockchainNetworkId;
  avalancheChainId: number;
}

export interface SendOptions {
  data?: string;
  gasLimit?: string;
  value?: string;
}

export interface ISendAsyncResult {
  receiptPromise: PromiEvent<TransactionReceipt>;
  transactionHash: string;
  rawTransaction: string;
}

export type Address = string;

export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

export interface ProviderMessage {
  type: string;
  data: unknown;
}

export interface IConnectResult {
  chainId: BlockchainNetworkId;
}

export interface IWalletMeta {
  description?: string;
  icons: string[] | null;
  name: string;
  url?: string;
}

export interface ITokenInfo {
  address: string;
  symbol?: string;
  decimals?: number;
  image?: string;
}

export abstract class KeyProvider {
  protected _currentAccount: string | null = null;
  protected _web3: Web3 | null = null;
  protected _latestBlockHeight = 0;
  protected _fetchInterval = 0;

  constructor(
    protected providerConfig: IProviderConfig,
    protected eventEmitter: EventEmitter,
  ) {
    this._fetchInterval = setInterval(async () => {
      if (!this._web3) return;
      this._latestBlockHeight = await this._web3.eth.getBlockNumber();
    }, 10_000) as any;
  }

  public abstract isBinanceSmartChain(): boolean;

  public abstract isBinanceWallet(): boolean;

  public abstract isAvalancheChain(): boolean;

  public abstract get name(): string;

  public abstract get walletMeta(): IWalletMeta | undefined;

  public getWeb3(): Web3 {
    if (!this._web3) throw new Error('Web3 must be initialized');
    return this._web3;
  }

  public latestBlockHeight(): number {
    return this._latestBlockHeight;
  }

  public async latestBlockHeightOrWait(): Promise<number> {
    while (!this._latestBlockHeight) {
      console.log(`Waiting for latest block height...`);
      await sleep(1_000);
    }
    return this._latestBlockHeight;
  }

  public changeLatestBlockHeight(blockHeight: number) {
    if (blockHeight > this._latestBlockHeight) {
      this._latestBlockHeight = blockHeight;
    }
  }

  public createContract(abi: AbiItem[] | AbiItem, address: string): Contract {
    if (!this._web3) throw new Error('Web3 must be initialized');
    // Temporary types fix
    const Contract = this._web3.eth.Contract as any;
    return new Contract(abi, address);
  }

  public abstract connect(): Promise<IConnectResult>;

  public abstract disconnect(): Promise<void>;

  public currentAccount(): string {
    if (!this._currentAccount) throw new Error('MetaMask is not activated');
    return this._currentAccount;
  }

  public currentChain(): BlockchainNetworkId {
    return this.providerConfig.ethereumChainId;
  }

  public currentNetwork(): BlockchainNetworkId | undefined {
    return this.providerConfig.ethereumChainId;
  }

  public abstract findAccounts(): Promise<string[]>;

  public async isGranted(address: string | undefined = undefined) {
    const accounts = await this.findAccounts();
    if (!Array.isArray(accounts)) {
      throw new Error('Accounts should have array type');
    } else if (address === undefined) {
      return accounts.length > 0;
    }
    return accounts.indexOf(address) >= 0;
  }

  public abstract sign(
    data: Buffer | string | Record<string, unknown>,
    address: string,
  ): Promise<string>;

  public abstract switchNetwork(chainId: number): Promise<string>;

  public abstract addTokenToWallet(tokenInfo: ITokenInfo): Promise<boolean>;

  public abstract sendAsync(
    from: string,
    to: string,
    sendOptions: SendOptions,
  ): Promise<ISendAsyncResult>;

  public async signLoginData(ttl: number): Promise<string> {
    const currentTime = Math.floor(new Date().getTime()),
      expiresAfter = currentTime + ttl;
    const data = `Stkr Login Message:\n${expiresAfter}`,
      signature = await this.sign(data, this.currentAccount());
    const formData = `signature=${signature}&address=${this.currentAccount()}&expires=${expiresAfter}`;
    return new Buffer(formData, 'utf-8').toString('base64');
  }

  public async getNativeBalance(address: string): Promise<string> {
    const balance = await this.getWeb3().eth.getBalance(address);
    return new BigNumber(`${balance}`)
      .dividedBy(new BigNumber(10).pow(18))
      .toString(10);
  }

  public async getErc20Balance(
    contract: Contract,
    address: string,
  ): Promise<BigNumber> {
    let balance = 0;
    try {
      balance = await contract.methods.balanceOf(address).call();
    } catch (error) {
      console.error(`Unable to get contract balance: ${error}`);
    }
    let decimals = 18;
    try {
      decimals = await contract.methods.decimals().call();
      if (!Number(decimals)) {
        decimals = 18;
      }
    } catch (e) {
      console.error(`Unable to calculate contract decimals: ${e}`);
    }
    return new BigNumber(`${balance}`).dividedBy(
      new BigNumber(10).pow(decimals),
    );
  }
}

export const providerDefaultOptions: IProviderOptions = {
  'custom-imtoken': {
    display: {
      logo: imTokenLogo,
      name: 'imToken',
      description: 'Easy and secure digital wallet trusted by millions',
    },
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: 'https://eth-03.dccn.ankr.com',
        5: 'https://goerli.infura.io/v3/3c88c0ec7e57421fa7d019780d2e6768',
        56: 'https://bsc-dataseed.binance.org/',
      },
    },
    connector: async (ProviderPackage: any, options: any) => {
      const provider = new ProviderPackage(options);
      await provider.enable();
      return provider;
    },
  },
  'custom-math': {
    display: {
      logo: mathLogo,
      name: 'Math Wallet',
      description: 'Gateway to the World of Blockchain',
    },
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: 'https://eth-03.dccn.ankr.com',
        5: 'https://goerli.infura.io/v3/3c88c0ec7e57421fa7d019780d2e6768',
        56: 'https://bsc-dataseed.binance.org/',
      },
    },
    connector: async (ProviderPackage: any, options: any) => {
      const provider = new ProviderPackage(options);
      await provider.enable();
      return provider;
    },
  },
  'custom-trust': {
    display: {
      logo: trustWalletLogo,
      name: 'Trust Wallet',
      description: 'The most trusted & secure crypto wallet',
    },
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: 'https://eth-03.dccn.ankr.com',
        5: 'https://goerli.infura.io/v3/3c88c0ec7e57421fa7d019780d2e6768',
        56: 'https://bsc-dataseed.binance.org/',
      },
    },
    connector: async (ProviderPackage: any, options: any) => {
      const provider = new ProviderPackage(options);
      await provider.enable();
      return provider;
    },
  },
  'custom-huobi': {
    display: {
      logo: huobiLogo,
      name: 'Huobi Wallet',
      description: 'Multi-currency support, practical and convenient',
    },
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: 'https://eth-03.dccn.ankr.com',
        5: 'https://goerli.infura.io/v3/3c88c0ec7e57421fa7d019780d2e6768',
        56: 'https://bsc-dataseed.binance.org/',
      },
    },
    connector: async (ProviderPackage: any, options: any) => {
      const provider = new ProviderPackage(options);
      await provider.enable();
      return provider;
    },
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: 'https://eth-03.dccn.ankr.com',
        5: 'https://goerli.infura.io/v3/3c88c0ec7e57421fa7d019780d2e6768',
        56: 'https://bsc-dataseed.binance.org/',
      },
    },
  },
};

export class Web3ModalKeyProvider extends KeyProvider {
  private web3Modal: Web3Modal | undefined;
  private provider: any;
  private binanceWallet = false;
  public name = 'Metamask';
  public chainId: BlockchainNetworkId | undefined = undefined;
  public walletMeta: IWalletMeta | undefined;

  async connect(): Promise<IConnectResult> {
    this.binanceWallet = false;

    const providerOptions: IProviderOptions = {
      ...(window.BinanceChain
        ? {
            'custom-binancewallet': {
              display: {
                logo: binanceWalletLogo,
                name: 'Binance Chain',
                description: 'Binance Chain & Smart Chain Wallet',
              },
              package: WalletConnectProvider,
              options: {},
              connector: async () => {
                const bsc = new BscConnector({
                  supportedChainIds: [
                    BlockchainNetworkId.smartchain,
                    BlockchainNetworkId.smartchainTestnet,
                  ],
                });
                const connectionResult = await bsc.activate();
                console.log(
                  `BSC is connected: ${JSON.stringify(
                    connectionResult,
                    null,
                    2,
                  )}`,
                );
                const account = await bsc.getAccount(),
                  chain = await bsc.getChainId();
                console.log(`Detected BSC account: ${account}`);
                console.log(`Detected BSC chain: ${chain}`);
                this.chainId = parseInt(
                  `${chain}`,
                  `${chain}`.startsWith('0x') ? 16 : 10,
                );
                this.binanceWallet = true;
                return await bsc.getProvider();
              },
            },
          }
        : {}),
      ...providerDefaultOptions,
    };

    this.web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions,
      theme: {
        background: PALETTE.background?.paper ?? '',
        main: PALETTE.text?.primary ?? '',
        secondary: alpha(PALETTE.text?.primary ?? '', 0.5),
        border: PALETTE.background?.default ?? '',
        hover: lighten(PALETTE.background?.paper ?? '', 0.03),
      },
    } as ICoreOptions);

    const provider = await this.web3Modal.connect();
    this.provider = provider;

    if (provider.walletMeta) {
      this.walletMeta = provider.walletMeta as IWalletMeta;
    } else {
      const { logo, name } = getProviderInfo(provider);

      this.walletMeta = {
        name,
        icons: [logo],
      };
    }

    const web3 = new Web3(provider);
    const chainId = Number(
      this.chainId ?? provider.chainId ?? provider.networkVersion,
    );

    await this.unlockAccounts(web3);
    provider.on('accountsChanged', (accounts: Address[]) => {
      this.eventEmitter.emit(KeyProviderEvents.AccountChanged, { accounts });
    });
    provider.on('disconnect', (error: ProviderRpcError) => {
      this.eventEmitter.emit(KeyProviderEvents.Disconnect, { error });
      console.log(
        `You've disconnected from MetaMask: ${JSON.stringify(error)}`,
      );
    });
    provider.on('message', (message: ProviderMessage) => {
      this.eventEmitter.emit(KeyProviderEvents.Message, message);
    });
    provider.on('chainChanged', (chainId: string) => {
      this.eventEmitter.emit(KeyProviderEvents.ChainChanged, {
        chainId,
      });
      console.log(`detected MetaMask chainId change to ${chainId}`);
    });
    provider.autoRefreshOnNetworkChange = false;
    this._latestBlockHeight = await web3.eth.getBlockNumber();
    this._web3 = web3;
    this.chainId = chainId;

    return { chainId };
  }

  public isBinanceSmartChain(): boolean {
    return (
      this.chainId === BlockchainNetworkId.smartchain ||
      this.chainId === BlockchainNetworkId.smartchainTestnet
    );
  }

  public isAvalancheChain(): boolean {
    console.log('CHAIN ID: ' + this.chainId);
    return (
      this.chainId === BlockchainNetworkId.avalanche ||
      this.chainId === BlockchainNetworkId.avalancheTestnet
    );
  }

  public isBinanceWallet(): boolean {
    return this.binanceWallet;
  }

  public currentNetwork(): BlockchainNetworkId | undefined {
    return this.chainId;
  }

  disconnect(): Promise<void> {
    this.chainId = undefined;
    try {
      clearInterval(this._fetchInterval);
      this.provider?.close();
      this.web3Modal?.clearCachedProvider();
    } catch (error) {
      console.error(error);
    }
    return Promise.resolve();
  }

  async findAccounts(): Promise<string[]> {
    return this._currentAccount ? [this._currentAccount] : [];
  }

  async sign(
    data: Buffer | string | Record<string, unknown>,
    address: string,
  ): Promise<string> {
    try {
      if (typeof data === 'object') {
        data = bytesToHex(data as any);
      }
      if (this.isBinanceWallet()) {
        return window.BinanceChain.request({
          method: 'eth_sign',
          params: [address, data],
        });
      }
      return this.getWeb3().eth.personal.sign(data, address, '');
    } catch (e: any) {
      console.error(e);
      const message = (e.message || e.error).substr(0, e.message.indexOf('\n')),
        parts = message.split(':');
      /* try to detect angry MetaMask messages */
      if (parts.length > 0) {
        /* special case for Firefox that doesn't return any errors, only extension stack trace */
        if (
          message.includes('@moz-extension') &&
          message.includes('Returned error: value')
        ) {
          throw new Error('User denied message signature');
        }
        /* cases for other browsers (tested in Chrome, Opera, Brave) */
        if (
          message.includes('MetaMask') ||
          message.includes('Returned error') ||
          message.includes('RPC Error')
        ) {
          throw new Error(parts[parts.length - 1]);
        }
      }
      throw e;
    }
  }

  public switchNetwork(chainId: number): Promise<any> {
    const config = RPCConfig[chainId];
    return this.provider
      .request({
        /**
         * Method [API](https://docs.metamask.io/guide/rpc-api.html#wallet-switchethereumchain)
         */
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: config.chainId }],
      })
      .catch((switchError: { code: number }) => {
        const isChainNotAdded = switchError.code === 4902;

        if (isChainNotAdded) {
          return this.provider
            .request({
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
        throw new Error('switchError');
      });
  }

  private tryGetRawTx(rawTx: any): string {
    const allowedChains = ['1', '3', '4', '42', '5'];
    if (!allowedChains.includes(`${this.chainId}`)) {
      console.warn(`raw tx can't be greated for this chain id ${this.chainId}`);
      return '';
    }
    const { v, r, s } = rawTx as any; /* this fields are not-documented */
    try {
      const newTx = new Transaction(
        {
          gasLimit: this.getWeb3().utils.numberToHex(rawTx.gas),
          gasPrice: this.getWeb3().utils.numberToHex(Number(rawTx.gasPrice)),
          to: `${rawTx.to}`,
          nonce: this.getWeb3().utils.numberToHex(rawTx.nonce),
          data: rawTx.input,
          v: v,
          r: r,
          s: s,
          value: this.getWeb3().utils.numberToHex(rawTx.value),
        },
        {
          chain: this.chainId,
        },
      );
      if (!newTx.verifySignature()) {
        throw new Error(`The signature is not valid for this transaction`);
      }
      console.log(`New Tx: `, JSON.stringify(newTx, null, 2));
      const rawTxHex = newTx.serialize().toString('hex');
      console.log(`Raw transaction hex is: `, rawTxHex);

      return rawTxHex;
    } catch (error) {
      return '';
    }
  }

  public async sendAsync(
    from: string,
    to: string,
    sendOptions: SendOptions,
  ): Promise<ISendAsyncResult> {
    const gasPrice = await this.getWeb3().eth.getGasPrice();
    console.log('Gas Price: ' + gasPrice);
    const nonce = await this.getWeb3().eth.getTransactionCount(from);
    console.log('Nonce: ' + nonce);
    const tx = {
      from: from,
      to: to,
      value: numberToHex(sendOptions.value || '0'),
      gas: numberToHex(sendOptions.gasLimit || '500000'),
      gasPrice: gasPrice,
      data: sendOptions.data,
      nonce: nonce,
      chainId: this.chainId,
    };
    console.log('Sending transaction via Web3: ', tx);
    return new Promise<ISendAsyncResult>((resolve, reject) => {
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
          const rawTxHex = this.tryGetRawTx(rawTx);
          resolve({
            receiptPromise: promise,
            transactionHash: transactionHash,
            rawTransaction: rawTxHex,
          });
        })
        .catch(reject);
    });
  }

  public addTokenToWallet(tokenInfo: ITokenInfo): Promise<boolean> {
    return this.provider
      .request({
        method: 'metamask_watchAsset',
        params: {
          type: 'ERC20',
          options: tokenInfo,
        },
      })
      .catch();
  }

  private async unlockAccounts(web3: Web3): Promise<string[]> {
    let unlockedAccounts: string[] = [];
    try {
      unlockedAccounts = await web3.eth.getAccounts();
    } catch (error) {
      console.error(error);
      throw new Error('User denied access to account');
    }
    console.log(`unlocked metamask accounts: ${unlockedAccounts}`);
    if (!unlockedAccounts.length || !unlockedAccounts[0]) {
      throw new Error('Unable to detect unlocked MetaMask account');
    }
    this._currentAccount = unlockedAccounts[0];
    console.log(`current account is ${this._currentAccount}`);
    return unlockedAccounts;
  }
}
