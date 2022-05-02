import axios, { AxiosInstance } from 'axios';
import BigNumber from 'bignumber.js';
import flatten from 'lodash/flatten';
import { TransactionReceipt } from 'web3-core';
import { Contract, EventData, Filter } from 'web3-eth-contract';

import {
  BlockchainNetworkId,
  IWeb3SendResult,
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from 'provider';

import { configFromEnv } from 'modules/api/config';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { ISwitcher } from 'modules/api/switcher';
import {
  ETH_SCALE_FACTOR,
  featuresConfig,
  isMainnet,
  MAX_UINT256,
  ZERO,
} from 'modules/common/const';
import { Env } from 'modules/common/types';
import { Token } from 'modules/common/types/token';
import { convertNumberToHex } from 'modules/common/utils/numbers/converters';
import { getAPY } from 'modules/stake/api/getAPY';
import {
  getTxEventsHistoryGroup,
  TTxEventsHistoryGroupData,
} from 'modules/stake/api/getTxEventsHistoryGroup';

import {
  FANTOM_PROVIDER_READ_ID,
  MAX_BLOCK_RANGE,
  BLOCK_OFFSET,
} from '../const';
import { TFtmSyntToken } from '../types/TFtmSyntToken';

import oldAFTMbAbi from './contracts/aFTMb-old.json';
import AFTMbAbi from './contracts/aFTMb.json';
import AFTMCAbi from './contracts/aFTMc.json';
import oldFantomPoolAbi from './contracts/FantomPool-old.json';
import FantomPoolAbi from './contracts/FantomPool.json';

export enum EFantomPoolEvents {
  TokensBurned = 'TokensBurned',
  Withdrawn = 'Withdrawn',
  StakeReceived = 'StakeReceived',
}

interface IFantomSDKProviders {
  writeProvider: Web3KeyWriteProvider;
  readProvider: Web3KeyReadProvider;
}

interface IGetPastEvents {
  provider: Web3KeyWriteProvider | Web3KeyReadProvider;
  contract: Contract;
  eventName: string;
  startBlock: number;
  rangeStep: number;
  filter?: Filter;
}

export interface IGetTxData {
  amount: BigNumber;
  isPending: boolean;
  destinationAddress?: string;
}

interface ILockSharesArgs {
  amount: BigNumber;
}

interface IUnlockSharesArgs {
  amount: BigNumber;
}

export class FantomSDK implements ISwitcher {
  private static instance?: FantomSDK;

  private readonly writeProvider: Web3KeyWriteProvider;

  private readonly readProvider: Web3KeyReadProvider;

  private currentAccount: string;

  private readonly api: AxiosInstance;

  private constructor({ readProvider, writeProvider }: IFantomSDKProviders) {
    FantomSDK.instance = this;
    const { gatewayConfig } = configFromEnv(
      isMainnet ? Env.Production : Env.Develop,
    );

    this.readProvider = readProvider;
    this.writeProvider = writeProvider;
    this.currentAccount = this.writeProvider.currentAccount;
    this.api = axios.create({
      baseURL: gatewayConfig.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json',
    });
  }

  public static async getInstance(): Promise<FantomSDK> {
    const providerManager = ProviderManagerSingleton.getInstance();
    const [writeProvider, readProvider] = await Promise.all([
      providerManager.getETHWriteProvider(),
      providerManager.getETHReadProvider(FANTOM_PROVIDER_READ_ID),
    ]);

    const addrHasNotBeenUpdated =
      FantomSDK.instance?.currentAccount === writeProvider.currentAccount;
    const hasNewProvider =
      FantomSDK.instance?.writeProvider === writeProvider &&
      FantomSDK.instance?.readProvider === readProvider;

    if (FantomSDK.instance && addrHasNotBeenUpdated && hasNewProvider) {
      return FantomSDK.instance;
    }

    const instance = new FantomSDK({ writeProvider, readProvider });
    const isFtmNetwork = await instance.isFtmNetwork(writeProvider);

    if (isFtmNetwork && !writeProvider.isConnected()) {
      await writeProvider.connect();
    }

    return instance;
  }

  private async getProvider(
    isForceRead = false,
  ): Promise<Web3KeyWriteProvider | Web3KeyReadProvider> {
    if (isForceRead) {
      return this.readProvider;
    }

    const isFtmChain = await this.isFtmNetwork(this.writeProvider);

    if (isFtmChain && !this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    if (isFtmChain) {
      return this.writeProvider;
    }

    return this.readProvider;
  }

  private async isFtmNetwork(provider: Web3KeyWriteProvider): Promise<boolean> {
    const web3 = provider.getWeb3();
    const chainId = await web3.eth.getChainId();

    return [
      BlockchainNetworkId.fantom,
      BlockchainNetworkId.fantomTestnet,
    ].includes(chainId);
  }

  private convertFromWei(amount: string): BigNumber {
    return new BigNumber(this.readProvider.getWeb3().utils.fromWei(amount));
  }

  private getFantomPoolContract(
    provider: Web3KeyWriteProvider | Web3KeyReadProvider,
  ): Contract {
    const { fantomConfig } = configFromEnv();
    const abi = featuresConfig.stakeAFTMC ? FantomPoolAbi : oldFantomPoolAbi;

    return provider.createContract(abi, fantomConfig.fantomPool);
  }

  private async getAftmbTokenContract() {
    const provider = await this.getProvider();

    const { fantomConfig } = configFromEnv();
    const abi = featuresConfig.stakeAFTMC ? AFTMbAbi : oldAFTMbAbi;

    return provider.createContract(abi, fantomConfig.aftmbToken);
  }

  private async getAftmcTokenContract() {
    const provider = await this.getProvider();

    const { fantomConfig } = configFromEnv();

    return provider.createContract(AFTMCAbi, fantomConfig.aftmcToken);
  }

  public async getTxHistory(): Promise<{
    stakeEvents: TTxEventsHistoryGroupData;
    pendingEvents: TTxEventsHistoryGroupData;
    withdrawnEvents: TTxEventsHistoryGroupData;
    totalPending: BigNumber;
  }> {
    const provider = await this.getProvider();
    const fantomPoolContract = this.getFantomPoolContract(provider);
    const web3 = provider.getWeb3();

    const firstWrId: string = await fantomPoolContract.methods
      .firstWrId()
      .call();

    const latestBlockNumber = await web3.eth.getBlockNumber();
    const startBlock = latestBlockNumber - BLOCK_OFFSET;

    const [stakeRawEvents, unstakeRawEvents, withdrawnRawEvents] =
      await Promise.all([
        // event StakeReceived is emitted once transaction is successfull
        this.getPastEvents({
          provider,
          contract: fantomPoolContract,
          startBlock,
          rangeStep: MAX_BLOCK_RANGE,
          eventName: EFantomPoolEvents.StakeReceived,
          filter: {
            staker: this.currentAccount,
          },
        }),
        // To gen pending withdrawal requests, one can get all TokensBurned events for given staker
        this.getPastEvents({
          provider,
          contract: fantomPoolContract,
          startBlock,
          rangeStep: MAX_BLOCK_RANGE,
          eventName: EFantomPoolEvents.TokensBurned,
          filter: {
            staker: this.currentAccount,
          },
        }),
        this.getPastEvents({
          provider,
          contract: fantomPoolContract,
          startBlock,
          rangeStep: MAX_BLOCK_RANGE,
          eventName: EFantomPoolEvents.Withdrawn,
          filter: {
            staker: this.currentAccount,
          },
        }),
      ]);

    const pendingRawEvents: EventData[] = [];

    unstakeRawEvents.forEach(current => {
      // Events with wrId >= firstWrId are pending
      if (+current.returnValues.wrId >= +firstWrId) {
        pendingRawEvents.push(current);
      }
    });

    const [stakeEvents, withdrawnEvents, pendingEvents] = await Promise.all(
      [stakeRawEvents, withdrawnRawEvents, pendingRawEvents].map(rawEvents =>
        getTxEventsHistoryGroup({ rawEvents, web3 }),
      ),
    );

    const totalPending = pendingEvents.reduce(
      (acc, { txAmount }) => acc.plus(txAmount),
      ZERO,
    );

    return {
      stakeEvents,
      pendingEvents,
      withdrawnEvents,
      totalPending,
    };
  }

  private async getPastEvents({
    provider,
    contract,
    eventName,
    startBlock,
    rangeStep,
    filter,
  }: IGetPastEvents): Promise<EventData[]> {
    const web3 = provider.getWeb3();
    const latestBlockNumber = await web3.eth.getBlockNumber();

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

  public async fetchTxData(txHash: string): Promise<IGetTxData> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();

    const tx = await web3.eth.getTransaction(txHash);

    return {
      amount: new BigNumber(web3.utils.fromWei(tx.value)),
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

  public async stake(
    amount: BigNumber,
    token: TFtmSyntToken,
  ): Promise<IWeb3SendResult> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const hexAmount = convertNumberToHex(amount, ETH_SCALE_FACTOR);
    const fantomPoolContract = this.getFantomPoolContract(this.writeProvider);

    const contractStake =
      fantomPoolContract.methods[this.getStakeMethodName(token)];

    return contractStake().send({
      from: this.currentAccount,
      value: hexAmount,
    });
  }

  private getStakeMethodName(token: TFtmSyntToken) {
    if (!featuresConfig.stakeAFTMC) {
      return 'stake';
    }

    switch (token) {
      case Token.aFTMc:
        return 'stakeAndClaimCerts';

      default:
        return 'stakeAndClaimBonds';
    }
  }

  public async getACAllowance(spender?: string): Promise<BigNumber> {
    const aFTMcContract = await this.getAftmcTokenContract();
    const { fantomConfig } = configFromEnv();

    const allowance = await aFTMcContract.methods
      .allowance(this.currentAccount, spender || fantomConfig.aftmbToken)
      .call();

    return new BigNumber(allowance);
  }

  public async checkAllowance(amount: BigNumber): Promise<boolean> {
    const allowance = await this.getACAllowance();

    return allowance.isGreaterThanOrEqualTo(
      convertNumberToHex(amount, ETH_SCALE_FACTOR),
    );
  }

  public async approveACForAB(
    amount = MAX_UINT256,
    scale = 1,
  ): Promise<IWeb3SendResult | undefined> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const isAllowed = await this.checkAllowance(amount);

    if (isAllowed) {
      return undefined;
    }

    const { fantomConfig } = configFromEnv();
    const aFTMcContract = await this.getAftmcTokenContract();

    const data = aFTMcContract.methods
      .approve(fantomConfig.aftmbToken, convertNumberToHex(amount, scale))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      fantomConfig.aftmcToken,
      { data, estimate: true },
    );
  }

  public async lockShares({
    amount,
  }: ILockSharesArgs): Promise<IWeb3SendResult> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const aFTMbContract = await this.getAftmbTokenContract();
    const { fantomConfig } = configFromEnv();

    const data = aFTMbContract.methods
      .lockShares(convertNumberToHex(amount, ETH_SCALE_FACTOR))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      fantomConfig.aftmbToken,
      { data, estimate: true },
    );
  }

  public async unlockShares({
    amount,
  }: IUnlockSharesArgs): Promise<IWeb3SendResult> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const aFTMbContract = await this.getAftmbTokenContract();
    const { fantomConfig } = configFromEnv();

    const data = aFTMbContract.methods
      .unlockShares(convertNumberToHex(amount, ETH_SCALE_FACTOR))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      fantomConfig.aftmbToken,
      { data, estimate: true },
    );
  }

  public async unstake(
    amount: BigNumber,
    token: TFtmSyntToken,
  ): Promise<IWeb3SendResult> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const hexAmount = convertNumberToHex(amount, ETH_SCALE_FACTOR);
    const fantomPoolContract = this.getFantomPoolContract(this.writeProvider);

    const contractUnstake =
      fantomPoolContract.methods[this.getUnstakeMethodName(token)];

    return contractUnstake(hexAmount).send({
      from: this.currentAccount,
    });
  }

  private getUnstakeMethodName(token: TFtmSyntToken) {
    if (!featuresConfig.stakeAFTMC) {
      return 'burn';
    }

    switch (token) {
      case Token.aFTMc:
        return 'burnCerts';

      default:
        return 'burnBonds';
    }
  }

  public async getBurnFee(amount: BigNumber): Promise<BigNumber> {
    const provider = await this.getProvider();
    const fantomPoolContract = this.getFantomPoolContract(provider);

    const hexAmount = convertNumberToHex(amount, ETH_SCALE_FACTOR);
    const burnFee = await fantomPoolContract.methods
      .getBurnFee(hexAmount)
      .call();

    return this.convertFromWei(burnFee);
  }

  public async getMinimumStake(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const fantomPoolContract = this.getFantomPoolContract(provider);

    const minStake = await fantomPoolContract.methods.getMinimumStake().call();

    return this.convertFromWei(minStake);
  }

  public async addTokenToWallet(token: TFtmSyntToken): Promise<boolean> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const { fantomConfig } = configFromEnv();
    const isAftmb = token === Token.aFTMb;

    const tokenContract = isAftmb
      ? await this.getAftmbTokenContract()
      : await this.getAftmcTokenContract();

    const address = isAftmb ? fantomConfig.aftmbToken : fantomConfig.aftmcToken;

    const [symbol, rawDecimals]: [string, string] = await Promise.all([
      tokenContract.methods.symbol().call(),
      tokenContract.methods.decimals().call(),
    ]);

    const decimals = Number.parseInt(rawDecimals, 10);

    const chainId: number = isMainnet
      ? BlockchainNetworkId.fantom
      : BlockchainNetworkId.fantomTestnet;

    return this.writeProvider.addTokenToWallet({
      address,
      symbol,
      decimals,
      chainId,
    });
  }

  public async getFtmBalance(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const ftmBalance = await web3.eth.getBalance(this.currentAccount);

    return this.convertFromWei(ftmBalance);
  }

  public async getABBalance(): Promise<BigNumber> {
    const aFTMbContract = await this.getAftmbTokenContract();

    const aFTMbBalance = await aFTMbContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(aFTMbBalance);
  }

  public async getACBalance(): Promise<BigNumber> {
    const aFTMcContract = await this.getAftmcTokenContract();

    const aFTMcBalance = await aFTMcContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(aFTMcBalance);
  }

  public async getACRatio(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const aFTMcContract = await this.getAftmcTokenContract();
    const web3 = provider.getWeb3();

    const rawRatio = await aFTMcContract.methods.ratio().call();
    const ratio = web3.utils.fromWei(rawRatio);

    return new BigNumber(ratio);
  }

  public async getPendingUnstakes(): Promise<BigNumber> {
    return this.api
      .get(`/v1alpha/fantom/unstakingStats/${this.currentAccount}`)
      .then(({ data }) => new BigNumber(data.unstakingAmount))
      .catch(() => ZERO);
  }

  public async getAftmbAPY(): Promise<BigNumber> {
    const provider = await this.getProvider();

    const aFTMbContract = await this.getAftmbTokenContract();

    return getAPY({
      tokenContract: aFTMbContract,
      web3: provider.getWeb3(),
    });
  }
}
