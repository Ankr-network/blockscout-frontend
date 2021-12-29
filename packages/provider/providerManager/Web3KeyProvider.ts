/* eslint-disable no-console */
import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import {
  HttpProvider,
  provider as Provider,
  WebsocketProvider,
} from 'web3-core';
import { Contract } from 'web3-eth-contract';
import { getProviderInfo } from 'web3modal';

export interface IWalletMeta {
  description?: string;
  icons: string[] | null;
  name: string;
  url?: string;
}

export abstract class Web3KeyProvider {
  protected web3: Web3 | null = null;

  protected currentChain = 0;

  protected accounts: string[] = [];

  protected currentAccount: string | null = null;

  protected provider: Provider = null;

  private walletMeta: IWalletMeta | undefined;

  public abstract inject(): Promise<void>;

  public async connect(): Promise<void> {
    const web3 = this.getWeb3();
    this.currentChain = await web3.eth.getChainId();
    this.setWalletMeta();
    await this.getUnlockedAccounts(web3);
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

  public getWeb3(): Web3 {
    if (!this.web3) {
      throw new Error('Web3 must be initialized');
    }

    return this.web3;
  }

  public getWalletMeta(): IWalletMeta {
    if (!this.isConnected()) {
      throw new Error('Provider must be connected');
    }
    return this.walletMeta;
  }

  public createContract(abi: any, address: string): Contract {
    const web3 = this.getWeb3();
    return new web3.eth.Contract(abi, address);
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
}
