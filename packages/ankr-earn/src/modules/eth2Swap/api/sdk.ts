import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';

import {
  IWeb3SendResult,
  AvailableWriteProviders,
  ProviderManager,
  Web3KeyProvider,
  Web3KeyReadProvider,
  AvailableReadProviders,
  BlockchainNetworkId,
} from 'provider';

import { configFromEnv } from 'modules/api/config';
import AETH from 'modules/api/contract/AETH.json';
import FETH from 'modules/api/contract/FETH.json';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { ETH_SCALE_FACTOR, isMainnet, MAX_UINT256 } from 'modules/common/const';
import { convertNumberToHex } from 'modules/common/utils/numbers/converters';

import { TSwapOption } from '../types';

export interface IGetEth2SwapServiceArgs {
  providerManager: ProviderManager;
  providerId: AvailableWriteProviders;
}

export interface IGetEth2SwapServiceData {
  ratio: BigNumber;
  aethBalance: BigNumber;
  fethBalance: BigNumber;
  allowance: BigNumber;
}

export interface IGetTxData {
  amount: BigNumber;
  isPending: boolean;
  destinationAddress?: string;
}

export interface IAddTokenToWalletArgs {
  swapOption: TSwapOption;
}

export interface ISharesArgs {
  amount: string;
}

export interface IEthSDKProviders {
  readProvider: Web3KeyReadProvider;
  writeProvider: Web3KeyProvider;
}

const CONFIG = configFromEnv();

const TOKENS = {
  aETHc: {
    address: CONFIG.contractConfig.aethContract,
    symbol: 'aETHc',
    decimals: 18,
  },

  aETHb: {
    address: CONFIG.contractConfig.fethContract,
    symbol: 'aETHb',
    decimals: 18,
  },
};

export class EthSDK {
  private static instance?: EthSDK;

  private readonly writeProvider: Web3KeyProvider;

  private readonly readProvider: Web3KeyReadProvider;

  private currentAccount: string;

  private constructor({ readProvider, writeProvider }: IEthSDKProviders) {
    EthSDK.instance = this;

    this.currentAccount = writeProvider.currentAccount;
    this.readProvider = readProvider;
    this.writeProvider = writeProvider;
  }

  public static async getInstance(): Promise<EthSDK> {
    const providerManager = ProviderManagerSingleton.getInstance();
    const [writeProvider, readProvider] = await Promise.all([
      providerManager.getProvider(AvailableWriteProviders.ethCompatible),
      providerManager.getReadProvider(
        isMainnet
          ? AvailableReadProviders.ethMainnet
          : AvailableReadProviders.ethGoerli,
      ),
    ]);

    const addrHasNotBeenUpdated =
      EthSDK.instance?.currentAccount === writeProvider.currentAccount;
    const hasNewProvider =
      EthSDK.instance?.writeProvider === writeProvider &&
      EthSDK.instance?.readProvider === readProvider;

    if (EthSDK.instance && addrHasNotBeenUpdated && hasNewProvider) {
      return EthSDK.instance;
    }

    const instance = new EthSDK({ writeProvider, readProvider });
    const isEthChain = await instance.isEthChain(writeProvider);

    if (isEthChain && !writeProvider.isConnected()) {
      await writeProvider.connect();
    }

    return instance;
  }

  private async isEthChain(provider: Web3KeyProvider): Promise<boolean> {
    const web3 = provider.getWeb3();
    const chainId = await web3.eth.getChainId();

    return [BlockchainNetworkId.mainnet, BlockchainNetworkId.goerli].includes(
      chainId,
    );
  }

  private async getProvider(): Promise<Web3KeyProvider | Web3KeyReadProvider> {
    const isEthChain = await this.isEthChain(this.writeProvider);

    if (isEthChain) {
      await this.connectWriteProvider();
      return this.writeProvider;
    }

    return this.readProvider;
  }

  private async connectWriteProvider(): Promise<void> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }
  }

  public async fetchEth2SwapData(): Promise<IGetEth2SwapServiceData> {
    const provider = await this.getProvider();
    const { contractConfig } = CONFIG;

    const aethContract = provider.createContract(
      AETH,
      contractConfig.aethContract,
    );
    const fethContract = provider.createContract(
      FETH,
      contractConfig.fethContract,
    );

    const [aethBalance, fethBalance, ratio, allowance] = await Promise.all([
      aethContract.methods.balanceOf(this.currentAccount).call(),
      fethContract.methods.balanceOf(this.currentAccount).call(),
      aethContract.methods.ratio().call(),
      aethContract.methods
        .allowance(this.currentAccount, contractConfig.fethContract)
        .call(),
    ]);

    return {
      ratio: new BigNumber(ratio),
      aethBalance: new BigNumber(aethBalance),
      fethBalance: new BigNumber(fethBalance),
      allowance: new BigNumber(allowance),
    };
  }

  public async fetchTxData(txHash: string): Promise<IGetTxData> {
    const provider = await this.getProvider();

    const web3 = provider.getWeb3();
    const tx = await web3.eth.getTransaction(txHash);
    const { 0: lockShares } = web3.eth.abi.decodeParameters(
      ['uint256'],
      tx.input.slice(10),
    );

    return {
      amount: new BigNumber(web3.utils.fromWei(lockShares)),
      destinationAddress: tx.to as string | undefined,
      isPending: tx.transactionIndex === null,
    };
  }

  public async fetchTxReceipt(
    txHash: string,
  ): Promise<TransactionReceipt | null> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();

    const receipt = await web3.eth.getTransactionReceipt(txHash);

    return receipt as TransactionReceipt | null;
  }

  public async approveAETHCForAETHB(): Promise<IWeb3SendResult> {
    await this.connectWriteProvider();

    const { contractConfig } = CONFIG;

    const aethContract = this.writeProvider.createContract(
      AETH,
      contractConfig.aethContract,
    );

    const data = aethContract.methods
      .approve(contractConfig.fethContract, convertNumberToHex(MAX_UINT256))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.aethContract,
      { data, estimate: true },
    );
  }

  public async lockShares({ amount }: ISharesArgs): Promise<IWeb3SendResult> {
    await this.connectWriteProvider();

    const { contractConfig } = CONFIG;

    const fethContract = this.writeProvider.createContract(
      FETH,
      contractConfig.fethContract,
    );

    const data = fethContract.methods
      .lockShares(convertNumberToHex(amount, ETH_SCALE_FACTOR))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.fethContract,
      { data, estimate: true },
    );
  }

  public async unlockShares({ amount }: ISharesArgs): Promise<IWeb3SendResult> {
    await this.connectWriteProvider();

    const { contractConfig } = CONFIG;

    const fethContract = this.writeProvider.createContract(
      FETH,
      contractConfig.fethContract,
    );

    const data = fethContract.methods
      .unlockShares(convertNumberToHex(amount, ETH_SCALE_FACTOR))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.fethContract,
      { data, estimate: true },
    );
  }

  public async addTokenToWallet({
    swapOption,
  }: IAddTokenToWalletArgs): Promise<void> {
    await this.connectWriteProvider();

    const data = TOKENS[swapOption];

    if (data) {
      await this.writeProvider.addTokenToWallet(data);
    }
  }
}
