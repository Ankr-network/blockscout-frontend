import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';
import { Contract } from 'web3-eth-contract';

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
import AETHC_CONTRACT from 'modules/api/contract/AETH.json';
import EHT_POOL_CONTRACT from 'modules/api/contract/EthereumPool.json';
import AETHB_CONTRACT from 'modules/api/contract/FETH.json';
import ABI_SYSTEM from 'modules/api/contract/SystemParameters.json';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { ETH_SCALE_FACTOR, isMainnet, MAX_UINT256 } from 'modules/common/const';
import { convertNumberToHex } from 'modules/common/utils/numbers/converters';

import { Token } from '../common/types/token';

export type TEthToken = Token.aETHb | Token.aETHc;

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
  swapOption: TEthToken;
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
    const isEthChain = instance.getIsEthChain();

    if (isEthChain && !writeProvider.isConnected()) {
      await writeProvider.connect();
    }

    return instance;
  }

  private getIsEthChain(): boolean {
    return [BlockchainNetworkId.mainnet, BlockchainNetworkId.goerli].includes(
      this.writeProvider.currentChain,
    );
  }

  public async getEthBalance(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const balance = await web3.eth.getBalance(this.currentAccount);

    return new BigNumber(web3.utils.fromWei(balance));
  }

  private async getProvider(): Promise<Web3KeyProvider | Web3KeyReadProvider> {
    const isEthChain = this.getIsEthChain();

    if (isEthChain) {
      await this.connectWriteProvider();
      return this.writeProvider;
    }

    return this.readProvider;
  }

  public async getAethbBalance(isFormatted?: boolean): Promise<BigNumber> {
    const provider = await this.getProvider();
    const aETHbContract = EthSDK.getAethbContract(provider);
    const web3 = provider.getWeb3();

    const rawBalance = await aETHbContract.methods
      .balanceOf(this.currentAccount)
      .call();

    const balance = isFormatted ? web3.utils.fromWei(rawBalance) : rawBalance;

    return new BigNumber(balance);
  }

  private static getAethbContract(
    provider: Web3KeyProvider | Web3KeyReadProvider,
  ): Contract {
    const { contractConfig } = CONFIG;

    return provider.createContract(AETHB_CONTRACT, contractConfig.fethContract);
  }

  public async getAethcBalance(isFormatted?: boolean): Promise<BigNumber> {
    const provider = await this.getProvider();
    const aETHcContract = EthSDK.getAethcContract(provider);
    const web3 = provider.getWeb3();

    const rawBalance = await aETHcContract.methods
      .balanceOf(this.currentAccount)
      .call();

    const balance = isFormatted ? web3.utils.fromWei(rawBalance) : rawBalance;

    return new BigNumber(balance);
  }

  private static getAethcContract(
    provider: Web3KeyProvider | Web3KeyReadProvider,
  ): Contract {
    const { contractConfig } = CONFIG;

    return provider.createContract(AETHC_CONTRACT, contractConfig.aethContract);
  }

  public async getAethcRatio(isFormatted?: boolean): Promise<BigNumber> {
    const provider = await this.getProvider();
    const aETHcContract = EthSDK.getAethcContract(provider);
    const web3 = provider.getWeb3();

    const rawRatio = await aETHcContract.methods.ratio().call();
    const ratio = isFormatted ? web3.utils.fromWei(rawRatio) : rawRatio;

    return new BigNumber(ratio);
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

  private async connectWriteProvider(): Promise<void> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }
  }

  public async getAllowance(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const aETHcContract = EthSDK.getAethcContract(provider);
    const { contractConfig } = CONFIG;

    const allowance = await aETHcContract.methods
      .allowance(this.currentAccount, contractConfig.fethContract)
      .call();

    return new BigNumber(allowance);
  }

  public async stake(
    amount: BigNumber,
    token: TEthToken,
  ): Promise<IWeb3SendResult> {
    await this.connectWriteProvider();
    const { contractConfig } = CONFIG;

    const ethPoolContract = this.writeProvider.createContract(
      EHT_POOL_CONTRACT,
      contractConfig.ethereumPool,
    );

    const stakeMethodByTokenMap = {
      [Token.aETHb]: 'stakeAndClaimAethB',
      [Token.aETHc]: 'stakeAndClaimAethC',
    };

    const hexAmount = convertNumberToHex(amount, ETH_SCALE_FACTOR);

    return ethPoolContract.methods[stakeMethodByTokenMap[token]]().send({
      from: this.currentAccount,
      value: hexAmount,
    });
  }

  public async getMinStake(): Promise<BigNumber> {
    const { contractConfig } = CONFIG;
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();

    const systemContract = provider.createContract(
      ABI_SYSTEM,
      contractConfig.systemContract,
    );

    const minStake = await systemContract.methods
      .REQUESTER_MINIMUM_POOL_STAKING()
      .call();

    return new BigNumber(web3.utils.fromWei(minStake));
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
      destinationAddress: tx.from as string | undefined,
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

    const aETHcContract = EthSDK.getAethcContract(this.writeProvider);

    const data = aETHcContract.methods
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
    const aETHbContract = EthSDK.getAethbContract(this.writeProvider);
    const { contractConfig } = CONFIG;

    const data = aETHbContract.methods
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
    const aETHbContract = EthSDK.getAethbContract(this.writeProvider);
    const { contractConfig } = CONFIG;

    const data = aETHbContract.methods
      .unlockShares(convertNumberToHex(amount, ETH_SCALE_FACTOR))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.fethContract,
      { data, estimate: true },
    );
  }
}
