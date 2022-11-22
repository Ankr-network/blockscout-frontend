import { t } from '@ankr.com/common';
import retry from 'async-retry';
import BigNumber from 'bignumber.js';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import {
  Address,
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from '@ankr.com/provider';
import { ProviderManagerSingleton } from '@ankr.com/staking-sdk';
import {
  ApiGateway,
  EActionStatuses,
  EActionTypes,
  EClaimStatuses,
  IClaimItem,
  IHistoryItem,
  PolkadotProvider,
  TPolkadotAddress,
} from 'polkadot';

import { configFromEnv } from 'modules/api/config';
import { ETH_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import {
  ExtraWriteProviders,
  Milliseconds,
  TAmountUnit,
} from 'modules/common/types';

import {
  ETH_NETWORKS,
  ETH_READ_PROVIDER_ID,
  MIN_STAKE_VALUE,
  POLKADOT_NETWORK_KEYS,
} from '../const';
import { EPolkadotNetworks } from '../types';

import ABI_ANKR_BOND from './contracts/AnkrBond.json';
import ABI_POLKADOT_POOL from './contracts/PolkadotPool.json';

export type TTxEventsHistoryGroupData = ITxEventsHistoryGroupItem[];

interface IPolkadotHistoryData {
  completedHistory: IHistoryItem[];
  pendingHistory: IHistoryItem[];
}

interface IPolkadotStakeSDKProps {
  ethReadProvider: Web3KeyReadProvider;
  ethWriteProvider: Web3KeyWriteProvider;
  polkadotWriteProvider: PolkadotProvider;
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

export enum ETxTypes {
  Staked = 'Staked',
  Unstaked = 'Unstaked',
}

const CLAIM_LEDGER_WAIT_TIME: Milliseconds = 5_000;
const CLAIM_LEDGER_REQ_RETRIES: TAmountUnit = 300_000 / CLAIM_LEDGER_WAIT_TIME; // (5 min / 5 sec) = 60
const CLAIM_TOKEN_LIFE_TIME: Milliseconds = 600_000; // 10 min
const POLKADOT_API_CACHE: Milliseconds = 10_000;

export class PolkadotStakeSDK {
  private readonly apiPolkadotGateway: ApiGateway;

  private readonly ethReadProvider: Web3KeyReadProvider;

  private readonly ethWriteProvider: Web3KeyWriteProvider;

  private readonly polkadotWriteProvider: PolkadotProvider;

  private static instance?: PolkadotStakeSDK;

  private currentETHAccount: Address;

  private currentPolkadotAccount: TPolkadotAddress;

  private invalidETHTokenAddrErrMsg?: string;

  private constructor({
    ethReadProvider,
    ethWriteProvider,
    polkadotWriteProvider,
  }: IPolkadotStakeSDKProps) {
    const {
      gatewayConfig: { baseUrl },
    } = configFromEnv();

    PolkadotStakeSDK.instance = this;

    this.apiPolkadotGateway = new ApiGateway({
      baseUrl,
      cacheAge: POLKADOT_API_CACHE,
    });

    this.currentETHAccount = ethWriteProvider.currentAccount;
    this.currentPolkadotAccount =
      polkadotWriteProvider.currentAccount as TPolkadotAddress;

    this.ethReadProvider = ethReadProvider;
    this.ethWriteProvider = ethWriteProvider;
    this.polkadotWriteProvider = polkadotWriteProvider;

    this.invalidETHTokenAddrErrMsg = t(
      'stake-polkadot.errors.invalid-eth-token-address',
    );
  }

  private async claimCommon(claimItem: IClaimItem): Promise<void> {
    const [ethPoolContract, ethTokenContract] = await Promise.all([
      this.getETHPoolContract(),
      this.getETHTokenContract(),
    ]);

    const isClaimValid = await ethPoolContract.methods
      .isClaimValid(
        ethTokenContract.options.address,
        claimItem.data.claimId,
        claimItem.data.claimBeforeBlock,
        claimItem.data.nativeAmount,
        this.currentETHAccount,
        claimItem.data.signature,
      )
      .call();

    if (!isClaimValid) {
      throw new Error(t('stake-polkadot.errors.claim-invalid'));
    }

    await ethPoolContract.methods
      .claimBonds(
        ethTokenContract.options.address,
        claimItem.data.claimId,
        claimItem.data.nativeAmount,
        claimItem.data.claimBeforeBlock,
        this.currentETHAccount,
        claimItem.data.signature,
      )
      .send({
        from: this.currentETHAccount,
      });
  }

  private async getAllActiveClaims(
    currNetwork: EPolkadotNetworks,
    loanId: number,
  ): Promise<IClaimItem[]> {
    const claims = await this.apiPolkadotGateway.getAllClaims({
      address: this.currentPolkadotAccount,
      loanId,
      network: currNetwork,
    });

    return claims
      .filter(({ status }) => status === EClaimStatuses.Active)
      .sort((a, b) => b.createdTimestamp - a.createdTimestamp);
  }

  private getETHTokenAddress(
    currNetwork: EPolkadotNetworks | unknown,
  ): Address | null {
    const { polkadotConfig } = configFromEnv();

    switch (currNetwork) {
      case EPolkadotNetworks.DOT:
        return polkadotConfig.aDOTbToken;

      case EPolkadotNetworks.KSM:
        return polkadotConfig.aKSMbToken;

      case EPolkadotNetworks.WND:
        return polkadotConfig.aWNDbToken;

      default:
        return null;
    }
  }

  private async getETHTokenContract(
    address?: Address,
    isForceRead = false,
  ): Promise<Contract> {
    const tokenAddress =
      typeof address === 'string'
        ? address
        : this.getETHTokenAddress(
            this.polkadotWriteProvider.currentNetworkType,
          );

    if (typeof tokenAddress !== 'string') {
      throw new Error(this.invalidETHTokenAddrErrMsg);
    }

    const ethProvider = await this.getETHProvider(isForceRead);
    const web3 = ethProvider.getWeb3();

    return new web3.eth.Contract(ABI_ANKR_BOND as AbiItem[], tokenAddress);
  }

  private async getETHPoolContract(isForceRead = false): Promise<Contract> {
    const { polkadotConfig } = configFromEnv();

    const ethProvider = await this.getETHProvider(isForceRead);
    const web3 = ethProvider.getWeb3();

    return new web3.eth.Contract(
      ABI_POLKADOT_POOL as AbiItem[],
      polkadotConfig.polkadotPool,
    );
  }

  private async getETHProvider(
    isForceRead = false,
  ): Promise<Web3KeyReadProvider | Web3KeyWriteProvider> {
    if (isForceRead) {
      return this.ethReadProvider;
    }

    const isValidETHNetwork = await this.isValidETHNetwork();

    if (isValidETHNetwork && !this.ethWriteProvider.isConnected()) {
      await this.ethWriteProvider.connect();
    }

    return isValidETHNetwork ? this.ethWriteProvider : this.ethReadProvider;
  }

  private async getPolkadotHistoryData(
    currNetwork: EPolkadotNetworks,
  ): Promise<IPolkadotHistoryData> {
    const completedHistory = [];

    const rawData = await this.apiPolkadotGateway.getHistory({
      address: this.currentPolkadotAccount,
      network: currNetwork,
    });

    // TODO Add "Unstake" type supporting (Polkadot History)
    const rawHistoryData = rawData.filter(
      ({ type }) => type === EActionTypes.Deposit,
    );

    for (let i = 0; i < rawHistoryData.length; i += 1) {
      const historyItem = rawHistoryData[i];

      switch (historyItem.status) {
        case EActionStatuses.Completed:
          completedHistory.push(historyItem);
          break;

        case EActionStatuses.Unknown:
          // TODO Add "Unstake" type supporting here only (Polkadot History)
          // pendingHistory.push(historyItem);
          break;

        default:
          break;
      }
    }

    return {
      completedHistory,
      pendingHistory: [],
    };
  }

  private getPolkadotHistoryGroup(
    rawHistory?: IHistoryItem[],
  ): TTxEventsHistoryGroupData {
    if (!Array.isArray(rawHistory) || !rawHistory.length) {
      return [];
    }

    return rawHistory
      .sort((a, b) => b.timestamp - a.timestamp)
      .map(
        ({ amount, timestamp, txId, type }): ITxEventsHistoryGroupItem => ({
          txAmount: new BigNumber(amount),
          txDate: new Date(timestamp * 1_000),
          txHash: txId,
          txType: this.getTxType(type),
        }),
      );
  }

  private async getPolkadotProvider(): Promise<PolkadotProvider> {
    const isValidPolkadotNetwork = this.isValidPolkadotNetwork();

    if (isValidPolkadotNetwork && !this.polkadotWriteProvider.isConnected()) {
      await this.polkadotWriteProvider.connect();
    }

    return this.polkadotWriteProvider;
  }

  private getTxType(rawTxType: EActionTypes): string | null {
    // TODO Add "Unstake" type supporting (Polkadot History)
    switch (rawTxType) {
      case EActionTypes.Deposit:
        return ETxTypes.Staked;

      default:
        return null;
    }
  }

  private async isValidETHNetwork(): Promise<boolean> {
    const web3 = this.ethWriteProvider.getWeb3();
    const chainId = await web3.eth.getChainId();

    return ETH_NETWORKS.includes(chainId);
  }

  private isValidPolkadotNetwork(): boolean {
    return POLKADOT_NETWORK_KEYS.includes(
      this.polkadotWriteProvider.currentNetworkType ?? '',
    );
  }

  static async getInstance(): Promise<PolkadotStakeSDK> {
    const providerManager = ProviderManagerSingleton.getInstance();

    const [ethReadProvider, ethWriteProvider, polkadotWriteProvider] =
      await Promise.all([
        providerManager.getETHReadProvider(ETH_READ_PROVIDER_ID),
        providerManager.getETHWriteProvider(),
        providerManager.getProvider<PolkadotProvider>(
          ExtraWriteProviders.polkadotCompatible,
        ),
      ]);

    // Get initialized instance
    const isOldAccounts =
      PolkadotStakeSDK.instance?.currentETHAccount ===
        ethWriteProvider.currentAccount &&
      PolkadotStakeSDK.instance?.currentPolkadotAccount ===
        polkadotWriteProvider.currentAccount;

    const isOldProviders =
      PolkadotStakeSDK.instance?.ethReadProvider === ethReadProvider &&
      PolkadotStakeSDK.instance?.ethWriteProvider === ethWriteProvider &&
      PolkadotStakeSDK.instance?.polkadotWriteProvider ===
        polkadotWriteProvider;

    if (PolkadotStakeSDK.instance && isOldAccounts && isOldProviders) {
      return PolkadotStakeSDK.instance;
    }

    // Get a new instance
    const instance = new PolkadotStakeSDK({
      ethReadProvider: ethReadProvider as Web3KeyReadProvider,
      ethWriteProvider,
      polkadotWriteProvider,
    });

    const isValidETHNetwork = await instance.isValidETHNetwork();
    const isValidPolkadotNetwork = instance.isValidPolkadotNetwork();

    if (isValidETHNetwork && !ethWriteProvider.isConnected()) {
      await ethWriteProvider.connect();
    }

    if (isValidPolkadotNetwork && !polkadotWriteProvider.isConnected()) {
      await polkadotWriteProvider.connect();
    }

    return instance;
  }

  async addETHTokenToWallet(currNetwork: EPolkadotNetworks): Promise<void> {
    if (!this.ethWriteProvider.isConnected()) {
      await this.ethWriteProvider.connect();
    }

    const address = this.getETHTokenAddress(currNetwork);

    if (typeof address !== 'string') {
      throw new Error(this.invalidETHTokenAddrErrMsg);
    }

    const ethTokenContract = await this.getETHTokenContract(address);

    const [rawDecimals, symbol]: [string, string] = await Promise.all([
      ethTokenContract.methods.decimals().call(),
      ethTokenContract.methods.symbol().call(),
    ]);

    const decimals = Number.parseInt(rawDecimals, 10);

    await this.ethWriteProvider.addTokenToWallet({
      address,
      chainId: ETH_NETWORK_BY_ENV as number,
      decimals,
      symbol,
    });
  }

  async claim(
    currNetwork: EPolkadotNetworks,
    claimableAmount: BigNumber,
  ): Promise<void> {
    const polkadotProvider = await this.getPolkadotProvider();

    const expirationTimestamp = Date.now() + CLAIM_TOKEN_LIFE_TIME;

    const signature = await polkadotProvider.getRawTokenSignature(
      this.currentPolkadotAccount,
      this.currentETHAccount,
      expirationTimestamp,
    );

    const { claim: claimItem } = await this.apiPolkadotGateway.claim({
      address: this.currentPolkadotAccount,
      amount: claimableAmount.toString(10),
      ethAddress: this.currentETHAccount,
      network: currNetwork,
      signature,
      timestamp: expirationTimestamp,
    });

    await this.claimCommon(claimItem);
  }

  /**
   *  @note Issues on Server side with "ACTIVE" status after sending the Polkadot transaction
   */
  async claimLedgerWallet(
    currNetwork: EPolkadotNetworks,
    claimableAmount: BigNumber,
  ): Promise<void> {
    const loanId = 0;

    const [activeClaimsCheck, polkadotProvider] = await Promise.all([
      this.getAllActiveClaims(currNetwork, loanId),
      this.getPolkadotProvider(),
    ]);

    if (activeClaimsCheck.length) {
      throw new Error(t('stake-polkadot.errors.claim-ledger-in-progress'));
    }

    const maxPolkadotNetworkDecimals =
      await this.getMaxPolkadotNetworkDecimals();

    const decimals = maxPolkadotNetworkDecimals.toNumber();
    const scaledClaimableAmount = claimableAmount.multipliedBy(10 ** decimals);

    const claimTransactionPayload = PolkadotProvider.getClaimTransactionPayload(
      this.currentETHAccount,
      loanId,
      scaledClaimableAmount,
    );

    const { blockHash, extId, transactionHash } =
      await polkadotProvider.sendSystemRemarkWithExtrinsic(
        this.currentPolkadotAccount,
        claimTransactionPayload,
      );

    // eslint-disable-next-line no-console
    console.log(
      `Transaction has been sent to block="${blockHash}" with ext="${extId}" and transactionHash="${transactionHash}"`,
    );

    const activeClaims = await retry(
      async () => {
        const data = await this.getAllActiveClaims(currNetwork, loanId);

        if (!data.length) {
          throw new Error(
            t('stake-polkadot.errors.claim-ledger-signature-expired', {
              token: currNetwork,
            }),
          );
        }

        return data;
      },
      {
        factor: 1,
        minTimeout: CLAIM_LEDGER_WAIT_TIME,
        randomize: false,
        retries: CLAIM_LEDGER_REQ_RETRIES,
      },
    );

    const [claimItem] = activeClaims;

    await this.claimCommon(claimItem);
  }

  async getETHTokenBalance(
    currNetwork?: EPolkadotNetworks,
  ): Promise<BigNumber> {
    const ethTokenAddress: Address | undefined =
      typeof currNetwork === 'string'
        ? this.getETHTokenAddress(currNetwork) ?? undefined
        : undefined;

    const ethTokenContract = await this.getETHTokenContract(ethTokenAddress);
    const ethProvider = await this.getETHProvider();

    return ethProvider.getTokenBalance(
      ethTokenContract,
      this.currentETHAccount,
    );
  }

  async getMaxETHTokenDecimals(): Promise<BigNumber> {
    const ethTokenContract = await this.getETHTokenContract();
    const decimals: string = await ethTokenContract.methods.decimals().call();

    return new BigNumber(decimals);
  }

  async getMaxPolkadotNetworkDecimals(): Promise<BigNumber> {
    const polkadotProvider = await this.getPolkadotProvider();
    const maxDecimals = polkadotProvider.getNetworkMaxDecimals();

    return new BigNumber(maxDecimals);
  }

  async getMinStake(): Promise<BigNumber> {
    const polkadotProvider = await this.getPolkadotProvider();
    const currNetwork = polkadotProvider.currentNetworkType;

    let minStakeValue: number;

    switch (currNetwork) {
      case EPolkadotNetworks.DOT:
        minStakeValue = MIN_STAKE_VALUE.DOT;
        break;

      case EPolkadotNetworks.KSM:
        minStakeValue = MIN_STAKE_VALUE.KSM;
        break;

      case EPolkadotNetworks.WND:
        minStakeValue = MIN_STAKE_VALUE.WND;
        break;

      default:
        minStakeValue = MIN_STAKE_VALUE.DEFAULT;
        break;
    }

    return new BigNumber(minStakeValue);
  }

  async getPolkadotAccountFullBalance(
    currNetwork: EPolkadotNetworks,
  ): Promise<BigNumber> {
    const polkadotProvider = await this.getPolkadotProvider();

    const { free: amount } = await polkadotProvider.getAccountBalanceByNetwork(
      currNetwork,
      this.currentPolkadotAccount,
    );

    return amount;
  }

  async getPolkadotAccountMaxSafeBalance(
    currNetwork: EPolkadotNetworks,
  ): Promise<BigNumber> {
    const polkadotProvider = await this.getPolkadotProvider();

    const [{ address: depositAddress }, { free: amount }] = await Promise.all([
      this.apiPolkadotGateway.depositAddress({
        network: currNetwork,
      }),
      polkadotProvider.getAccountBalance(this.currentPolkadotAccount),
    ]);

    return polkadotProvider.getMaxPossibleSendAmount(
      this.currentPolkadotAccount,
      depositAddress,
      amount,
    );
  }

  async getPolkadotNetworkMinSafeDepositVal(): Promise<BigNumber> {
    const polkadotProvider = await this.getPolkadotProvider();

    return polkadotProvider.getMinSafeDepositVal();
  }

  async getPolkadotPendingHistoryAmountSum(
    currNetwork: EPolkadotNetworks,
  ): Promise<BigNumber> {
    const { pendingHistory } = await this.getPolkadotHistoryData(currNetwork);

    return pendingHistory.reduce((sum, { amount }) => sum.plus(amount), ZERO);
  }

  async getTxEventsHistory(
    currNetwork: EPolkadotNetworks,
  ): Promise<ITxEventsHistoryData> {
    const {
      completedHistory: rawCompletedHistory,
      pendingHistory: rawPendingHistory,
    } = await this.getPolkadotHistoryData(currNetwork);

    return {
      completed: this.getPolkadotHistoryGroup(rawCompletedHistory),
      pending: this.getPolkadotHistoryGroup(rawPendingHistory),
    };
  }

  async stake(
    currNetwork: EPolkadotNetworks,
    amount: BigNumber,
  ): Promise<void> {
    const polkadotProvider = await this.getPolkadotProvider();

    const { address: depositAddress } =
      await this.apiPolkadotGateway.depositAddress({
        network: currNetwork,
      });

    const { extId: extrinsic } = await polkadotProvider.sendFundsWithExtrinsic(
      this.currentPolkadotAccount,
      depositAddress,
      amount,
    );

    const { id, status } = await this.apiPolkadotGateway.deposit({
      network: currNetwork,
      extrinsic,
    });

    if (status !== EActionStatuses.Completed) {
      throw new Error(
        t('stake-polkadot.errors.uncompleted-stake-transaction', {
          id,
          status,
        }),
      );
    }
  }

  async unstake(address: TPolkadotAddress, amount: BigNumber): Promise<void> {
    if (!this.polkadotWriteProvider.isConnected()) {
      await this.polkadotWriteProvider.connect();
    }

    if (!this.ethWriteProvider.isConnected()) {
      await this.ethWriteProvider.connect();
    }

    const [ethPoolContract, ethTokenContract, maxETHTokenDecimals] =
      await Promise.all([
        this.getETHPoolContract(),
        this.getETHTokenContract(),
        this.getMaxETHTokenDecimals(),
      ]);

    const decimals = Number.parseInt(maxETHTokenDecimals.toString(10), 10);
    const scaledAmount = amount.multipliedBy(10 ** decimals).toString(10);

    const polkadotAddressBytes =
      PolkadotProvider.extractDecodedAddress(address);

    await ethPoolContract.methods
      .burnBond(
        ethTokenContract.options.address,
        scaledAmount,
        polkadotAddressBytes,
      )
      .send({
        from: this.currentETHAccount,
      });
  }
}
