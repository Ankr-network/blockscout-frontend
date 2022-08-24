import BigNumber from 'bignumber.js';
import { Contract } from 'web3-eth-contract';

import {
  EEthereumNetworkId,
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from '@ankr.com/provider';
import { ProviderManagerSingleton } from '@ankr.com/staking-sdk';

import { configFromEnv } from 'modules/api/config';

import INSURANCE_ABI from '../contracts/InsuranceContract.json';
import MGNO_ABI from '../contracts/mGNO.json';
import PROVIDER_ABI from '../contracts/ProviderContract.json';
import REWARD_ABI from '../contracts/RewardContract.json';
import STAKING_ABI from '../contracts/StakingContract.json';

import { GNOSIS_PROVIDER_READ_ID } from './const';

const { contractConfig } = configFromEnv();

interface IGnosisStakingSDKProviders {
  writeProvider: Web3KeyWriteProvider;
  readProvider: Web3KeyReadProvider;
}

export class GnosisStakingSDK {
  private static instance?: GnosisStakingSDK;

  private readonly writeProvider: Web3KeyWriteProvider;

  private readonly readProvider: Web3KeyReadProvider;

  private currentAccount: string;

  private constructor({
    readProvider,
    writeProvider,
  }: IGnosisStakingSDKProviders) {
    GnosisStakingSDK.instance = this;

    this.writeProvider = writeProvider;
    this.readProvider = readProvider;
    this.currentAccount = this.writeProvider.currentAccount;
  }

  public static async getInstance(): Promise<GnosisStakingSDK> {
    const providerManager = ProviderManagerSingleton.getInstance();
    const [writeProvider, readProvider] = await Promise.all([
      providerManager.getETHWriteProvider(),
      providerManager.getETHReadProvider(GNOSIS_PROVIDER_READ_ID),
    ]);

    const addrHasNotBeenUpdated =
      GnosisStakingSDK.instance?.currentAccount ===
      writeProvider.currentAccount;
    const hasNewProvider =
      GnosisStakingSDK.instance?.writeProvider === writeProvider &&
      GnosisStakingSDK.instance.readProvider === readProvider;

    if (GnosisStakingSDK.instance && addrHasNotBeenUpdated && hasNewProvider) {
      return GnosisStakingSDK.instance;
    }

    const instance = new GnosisStakingSDK({ writeProvider, readProvider });
    const isGnosisChain = await instance.isGnosisNetwork(writeProvider);

    if (isGnosisChain && !writeProvider.isConnected()) {
      await writeProvider.connect();
    }

    return instance;
  }

  private async isGnosisNetwork(
    provider: Web3KeyWriteProvider,
  ): Promise<boolean> {
    const web3 = provider.getWeb3();
    const chainId = await web3.eth.getChainId();

    return [EEthereumNetworkId.gnosis, EEthereumNetworkId.sokol].includes(
      chainId,
    );
  }

  private async getProvider(): Promise<
    Web3KeyWriteProvider | Web3KeyReadProvider
  > {
    const isGnosisChain = await this.isGnosisNetwork(this.writeProvider);

    if (isGnosisChain && !this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    if (isGnosisChain) {
      return this.writeProvider;
    }

    return this.readProvider;
  }

  private async getMgnoContract(): Promise<Contract> {
    return this.readProvider.createContract(MGNO_ABI, contractConfig.mGNOToken);
  }

  private async getProviderContract(): Promise<Contract> {
    return this.readProvider.createContract(
      PROVIDER_ABI,
      contractConfig.gnosisProviderContract,
    );
  }

  private async getStakingContract(): Promise<Contract> {
    return this.readProvider.createContract(
      STAKING_ABI,
      contractConfig.gnosisStakingContract,
    );
  }

  private async getInsuranceContract(): Promise<Contract> {
    return this.readProvider.createContract(
      INSURANCE_ABI,
      contractConfig.gnosisInsuranceContract,
    );
  }

  private async getRewardContract(): Promise<Contract> {
    return this.readProvider.createContract(
      REWARD_ABI,
      contractConfig.gnosisRewardContract,
    );
  }

  public async getMgnoBalance(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const mgnoContract = await this.getMgnoContract();
    const balance = await provider.getErc20Balance(
      mgnoContract,
      this.currentAccount,
    );

    return balance;
  }
}
