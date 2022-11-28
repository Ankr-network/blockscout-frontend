import { Address, IProvider, IWalletMeta } from '@ankr.com/provider';
import { DEFAULT_WALLET_NAME } from './const';
import SuiIcon from './assets/sui-icon.svg';

interface WindowSuiWalletExtension {
  suiWallet?: Record<string, undefined>;
}

interface IWallet {
  requestPermissions(): Promise<void>;
  hasPermissions(): Promise<boolean>;
  getAccounts(): Promise<string[]>;
}

export class SuiProvider implements IProvider {
  protected currAccount: Address | null = null;

  private wallet?: IWallet;

  public get currentAccount(): Address | null {
    return this.currAccount;
  }

  public set currentAccount(addr: Address | null) {
    this.currAccount = addr;
  }

  static isInjected(): boolean {
    return !!(window as Window & WindowSuiWalletExtension).suiWallet;
  }

  public getWalletMeta(): IWalletMeta {
    return {
      icon: SuiIcon,
      id: 'suiWallet',
      name: DEFAULT_WALLET_NAME,
    };
  }

  public isWalletConnected(): boolean {
    return !!this.wallet;
  }

  public isConnected(): boolean {
    return SuiProvider.isInjected() && this.isWalletConnected();
  }

  public async connect(): Promise<void> {
    // @ts-ignore
    await (
      window as Window & WindowSuiWalletExtension
    )?.suiWallet.requestPermissions();
    this.wallet = (window as Window & WindowSuiWalletExtension)
      .suiWallet as unknown as IWallet;
  }

  // todo: change it
  public disconnect(): void {
    throw new Error('Method not implemented.');
  }
}
