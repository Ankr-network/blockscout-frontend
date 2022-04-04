import BigNumber from 'bignumber.js';

import { PolkadotProvider } from 'polkadot';

import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';

export type TTxEventsHistoryGroupData = ITxEventsHistoryGroupItem[];

interface IPolkadotStakeSDKProviders {
  writeProvider: PolkadotProvider;
}

export interface ITxEventsHistoryGroupItem {
  txAmount: BigNumber;
  txDate: Date;
  txHash: string;
  txType: string | null;
}

export interface ITxEventsHistoryData {
  completed: TTxEventsHistoryGroupData;
  pending: TTxEventsHistoryGroupData;
}

export class PolkadotStakeSDK {
  private readonly writeProvider: PolkadotProvider;

  private static instance?: PolkadotStakeSDK;

  private currentAccount: string;

  private constructor({ writeProvider }: IPolkadotStakeSDKProviders) {
    PolkadotStakeSDK.instance = this;

    this.currentAccount = writeProvider.currentAccount as string;
    this.writeProvider = writeProvider;
  }

  static async getInstance(): Promise<PolkadotStakeSDK> {
    const providerManager = ProviderManagerSingleton.getInstance();
    const [writeProvider] = await Promise.all([
      providerManager.getPolkadotWriteProvider(),
    ]);

    const isNewProvider =
      PolkadotStakeSDK.instance?.writeProvider === writeProvider;
    const isNotUpdatedAccount =
      PolkadotStakeSDK.instance?.currentAccount ===
      writeProvider.currentAccount;

    if (PolkadotStakeSDK.instance && isNewProvider && isNotUpdatedAccount) {
      return PolkadotStakeSDK.instance;
    }

    const instance = new PolkadotStakeSDK({ writeProvider });

    if (!writeProvider.isConnected()) {
      await writeProvider.connect();
    }

    return instance;
  }

  async getETHTokenBalance(): Promise<BigNumber> {
    return new BigNumber(1);
  }

  async getMinimumStake(): Promise<BigNumber> {
    return new BigNumber(1);
  }

  async getPendingUnstakes(): Promise<BigNumber> {
    return new BigNumber(1);
  }

  async getPolkadotTokenBalance(): Promise<BigNumber> {
    return new BigNumber(1);
  }

  async getTxEventsHistory(): Promise<ITxEventsHistoryData> {
    return {
      completed: [],
      pending: [],
    };
  }

  async unstake(address: string, amount: BigNumber): Promise<void> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    // eslint-disable-next-line no-console
    console.log(address, amount.toNumber());
  }
}
