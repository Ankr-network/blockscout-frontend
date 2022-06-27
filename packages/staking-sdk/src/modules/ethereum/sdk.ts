import BigNumber from 'bignumber.js';
import flatten from 'lodash/flatten';
import { TransactionReceipt } from 'web3-core';
import { Contract, EventData } from 'web3-eth-contract';

import { ProviderManagerSingleton } from '@ankr.com/staking-sdk';
import {
  AvailableReadProviders,
  EEthereumNetworkId,
  IWeb3SendResult,
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from 'provider';

import { convertNumberToHex } from '..';
import {
  ETH_SCALE_FACTOR,
  isMainnet,
  MAX_UINT256,
  configFromEnv,
} from '../common';
import {
  AETHB_ABI,
  AETHC_ABI,
  ETHEREUM_POOL_ABI,
  SYSTEM_PARAMETERS_ABI,
} from '../contracts';
import {
  ITxEventsHistoryData,
  IGetPastEvents,
  getTxEventsHistoryGroup,
} from '../stake';
import { ISwitcher, IFetchTxData, IShareArgs } from '../switcher';

import {
  ETH_BLOCK_OFFSET,
  ETH_HISTORY_RANGE_STEP,
  METHOD_NAME_BY_SYMBOL,
  TOKENS_CONFIG_BY_SYMBOL,
} from './const';
import { EPoolEvents, IEthSDKProviders, TEthToken } from './types';

const CONFIG = configFromEnv();

export class EthSDK implements ISwitcher {
  private static instance?: EthSDK;

  private readonly writeProvider: Web3KeyWriteProvider;

  private readonly readProvider: Web3KeyReadProvider;

  private currentAccount: string;

  private stakeGasFee?: BigNumber;

  private constructor({ readProvider, writeProvider }: IEthSDKProviders) {
    EthSDK.instance = this;

    this.currentAccount = writeProvider.currentAccount;
    this.readProvider = readProvider;
    this.writeProvider = writeProvider;
  }

  public static async getInstance(): Promise<EthSDK> {
    const providerManager = ProviderManagerSingleton.getInstance();
    const [writeProvider, readProvider] = await Promise.all([
      providerManager.getETHWriteProvider(),
      providerManager.getETHReadProvider(
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
    return [EEthereumNetworkId.mainnet, EEthereumNetworkId.goerli].includes(
      this.writeProvider.currentChain,
    );
  }

  public async getEthBalance(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const balance = await web3.eth.getBalance(this.currentAccount);

    return new BigNumber(web3.utils.fromWei(balance));
  }

  private async getProvider(): Promise<
    Web3KeyWriteProvider | Web3KeyReadProvider
  > {
    const isEthChain = this.getIsEthChain();

    if (isEthChain) {
      await this.connectWriteProvider();
      return this.writeProvider;
    }

    return this.readProvider;
  }

  public async getABBalance(isFormatted?: boolean): Promise<BigNumber> {
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
    provider: Web3KeyWriteProvider | Web3KeyReadProvider,
  ): Contract {
    const { contractConfig } = CONFIG;

    return provider.createContract(AETHB_ABI, contractConfig.fethContract);
  }

  public async getACBalance(isFormatted?: boolean): Promise<BigNumber> {
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
    provider: Web3KeyWriteProvider | Web3KeyReadProvider,
  ): Contract {
    const { contractConfig } = CONFIG;

    return provider.createContract(AETHC_ABI, contractConfig.aethContract);
  }

  public async getACRatio(isFormatted?: boolean): Promise<BigNumber> {
    const provider = await this.getProvider();
    const aETHcContract = EthSDK.getAethcContract(provider);
    const web3 = provider.getWeb3();

    const rawRatio = await aETHcContract.methods.ratio().call();
    const ratio = isFormatted ? web3.utils.fromWei(rawRatio) : rawRatio;

    return new BigNumber(ratio);
  }

  public async addTokenToWallet(token: string): Promise<boolean> {
    await this.connectWriteProvider();

    const data = TOKENS_CONFIG_BY_SYMBOL[token as TEthToken];

    if (!data) {
      throw new Error('Failed to add token to wallet');
    }

    return this.writeProvider.addTokenToWallet(data);
  }

  private async connectWriteProvider(): Promise<void> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }
  }

  public async getACAllowance(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const aETHcContract = EthSDK.getAethcContract(provider);
    const { contractConfig } = CONFIG;

    const allowance = await aETHcContract.methods
      .allowance(this.currentAccount, contractConfig.fethContract)
      .call();

    return new BigNumber(allowance);
  }

  /**
   * This method is only for creating a testing ability.
   * It is related to the [STAKAN-1259](https://ankrnetwork.atlassian.net/browse/STAKAN-1259)
   * Do not use it for the production code.
   * @deprecated
   */
  public async stakeWithoutClaim(amount: BigNumber): Promise<IWeb3SendResult> {
    await this.connectWriteProvider();

    const hexAmount = convertNumberToHex(amount, ETH_SCALE_FACTOR);

    const ethPoolContract = EthSDK.getEthPoolContract(this.writeProvider);

    return ethPoolContract.methods.stake().send({
      from: this.currentAccount,
      value: hexAmount,
    });
  }

  public async stake(
    amount: BigNumber,
    token: string,
  ): Promise<IWeb3SendResult> {
    await this.connectWriteProvider();

    let gasFee = this.stakeGasFee;
    if (!gasFee) {
      gasFee = await this.getStakeGasFee(amount, token);
    }

    const balance = await this.getEthBalance();
    const maxAmount = balance.minus(gasFee);
    const stakeAmount = amount.isGreaterThan(maxAmount) ? maxAmount : amount;
    const hexAmount = convertNumberToHex(stakeAmount, ETH_SCALE_FACTOR);

    const ethPoolContract = EthSDK.getEthPoolContract(this.writeProvider);

    const contractStake =
      ethPoolContract.methods[METHOD_NAME_BY_SYMBOL[token as TEthToken].stake];

    const gasLimit: number = await contractStake().estimateGas({
      from: this.currentAccount,
      value: hexAmount,
    });

    return contractStake().send({
      from: this.currentAccount,
      value: hexAmount,
      gas: gasLimit,
    });
  }

  public async getStakeGasFee(
    amount: BigNumber,
    token: string,
  ): Promise<BigNumber> {
    const provider = await this.getProvider();
    const ethPoolContract = EthSDK.getEthPoolContract(provider);

    const contractStake =
      ethPoolContract.methods[METHOD_NAME_BY_SYMBOL[token as TEthToken].stake];

    const estimatedGas: number = await contractStake().estimateGas({
      from: this.currentAccount,
      value: convertNumberToHex(amount, ETH_SCALE_FACTOR),
    });

    const stakeGasFee = await provider.getContractMethodFee(estimatedGas);

    this.stakeGasFee = stakeGasFee;

    return stakeGasFee;
  }

  private static getEthPoolContract(
    provider: Web3KeyWriteProvider | Web3KeyReadProvider,
  ): Contract {
    const { contractConfig } = CONFIG;

    return provider.createContract(
      ETHEREUM_POOL_ABI,
      contractConfig.ethereumPool,
    );
  }

  public async getMinStake(): Promise<BigNumber> {
    const { contractConfig } = CONFIG;
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();

    const systemContract = provider.createContract(
      SYSTEM_PARAMETERS_ABI,
      contractConfig.systemContract,
    );

    const minStake = await systemContract.methods
      .REQUESTER_MINIMUM_POOL_STAKING()
      .call();

    return new BigNumber(web3.utils.fromWei(minStake));
  }

  public async fetchTxData(
    txHash: string,
    shouldDecodeAmount = true,
  ): Promise<IFetchTxData> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const tx = await web3.eth.getTransaction(txHash);

    const decodeAmount = (): BigNumber => {
      const { 0: rawAmount } =
        tx.value === '0'
          ? web3.eth.abi.decodeParameters(['uint256'], tx.input.slice(10))
          : { 0: tx.value };

      return new BigNumber(web3.utils.fromWei(rawAmount));
    };

    return {
      amount: shouldDecodeAmount ? decodeAmount() : undefined,
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

  public async getTxEventsHistory(): Promise<ITxEventsHistoryData> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const ethPoolContract = EthSDK.getEthPoolContract(provider);

    const latestBlockNumber = await web3.eth.getBlockNumber();
    const startBlock = latestBlockNumber - ETH_BLOCK_OFFSET;

    const [claimEvents, ratio] = await Promise.all([
      this.getPastEvents({
        provider: this.readProvider,
        contract: ethPoolContract,
        eventName: EPoolEvents.RewardClaimed,
        startBlock,
        latestBlockNumber,
        rangeStep: ETH_HISTORY_RANGE_STEP,
        filter: {
          staker: this.currentAccount,
        },
      }),
      this.getACRatio(),
    ]);

    const mapEvents = (events: EventData[]): EventData[] =>
      events.map(event => ({
        ...event,
        returnValues: {
          ...event.returnValues,
          amount: new BigNumber(event.returnValues.amount)
            .dividedBy(ratio)
            .multipliedBy(10 ** 18)
            .toFixed(),
        },
      }));

    const [completedCertificate, completedBond] = await Promise.all([
      getTxEventsHistoryGroup({
        rawEvents: mapEvents(
          claimEvents.filter(({ returnValues }) => returnValues.isAETH),
        ),
        web3,
      }),
      getTxEventsHistoryGroup({
        rawEvents: mapEvents(
          claimEvents.filter(({ returnValues }) => !returnValues.isAETH),
        ),
        web3,
      }),
    ]);

    return {
      completedCertificate,
      completedBond,
      pendingBond: [],
      pendingCertificate: [],
    };
  }

  private async getPastEvents({
    contract,
    eventName,
    startBlock,
    latestBlockNumber,
    rangeStep,
    filter,
  }: IGetPastEvents): Promise<EventData[]> {
    const eventsPromises: Promise<EventData[]>[] = [];

    for (let i = startBlock; i < latestBlockNumber; i += rangeStep) {
      const fromBlock = i;
      const toBlock = fromBlock + rangeStep;

      eventsPromises.push(
        contract.getPastEvents(eventName, { fromBlock, toBlock, filter }),
      );
    }

    const pastEvents = await Promise.all(eventsPromises);

    return flatten(pastEvents);
  }

  public async approveACForAB(
    amount = MAX_UINT256,
    scale = 1,
  ): Promise<IWeb3SendResult> {
    await this.connectWriteProvider();

    const { contractConfig } = CONFIG;

    const aETHcContract = EthSDK.getAethcContract(this.writeProvider);

    const data = aETHcContract.methods
      .approve(contractConfig.fethContract, convertNumberToHex(amount, scale))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.aethContract,
      { data, estimate: true },
    );
  }

  public async lockShares({ amount }: IShareArgs): Promise<IWeb3SendResult> {
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

  public async unlockShares({ amount }: IShareArgs): Promise<IWeb3SendResult> {
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

  public async getClaimable(token: string): Promise<BigNumber> {
    const provider = await this.getProvider();
    const ethPoolContract = EthSDK.getEthPoolContract(provider);
    const web3 = provider.getWeb3();

    const contractGetClaimable =
      ethPoolContract.methods[
        METHOD_NAME_BY_SYMBOL[token as TEthToken].claimable
      ];

    const rawValue = await contractGetClaimable(this.currentAccount).call();

    return new BigNumber(web3.utils.fromWei(rawValue));
  }

  public async claim(token: string): Promise<IWeb3SendResult> {
    await this.connectWriteProvider();
    const { contractConfig } = CONFIG;
    const ethPoolContract = EthSDK.getEthPoolContract(this.writeProvider);
    const contractClaim =
      ethPoolContract.methods[METHOD_NAME_BY_SYMBOL[token as TEthToken].claim];
    const data: string = contractClaim().encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.ethereumPool,
      { data },
    );
  }
}
