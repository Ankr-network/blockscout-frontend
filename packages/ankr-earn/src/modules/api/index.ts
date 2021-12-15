import { VoteStatus } from '@ankr.com/stkr-jssdk';
import BigNumber from 'bignumber.js';
import { EventEmitter } from 'events';
import Web3 from 'web3';
import { SendOptions } from 'web3-eth-contract';
import { DepositType, SupportedBlockchainNetworkId } from '../../common/types';
import { CrossChainSdk } from '../cross-chain-sdk';
import { configFromEnv, IStkrConfig } from './config';
import {
  AvalancheContractManager,
  BinanceContractManager,
  EthereumContractManager,
  IContractManager,
} from './contract';
import { ContractManagerEvent, KeyProviderEvents } from './event';
import {
  ApiGateway,
  IConvertEstimateReply,
  IGlobalStatsReply,
  INotarizeTransferReply,
  ISidecarReply,
  IStakerStats,
  IUserStakeReply,
} from './gateway';
import { JssdkManager } from './jssdk';
import {
  IConnectResult,
  ISendAsyncResult,
  IWalletMeta,
  KeyProvider,
  Web3ModalKeyProvider,
} from './provider';

interface IStakerSdk {
  allowTokens(remainingAllowance?: BigNumber): Promise<ISendAsyncResult>;

  waitForAllowance(remainingAllowance?: BigNumber): Promise<void>;

  stake(
    stakingAmount: BigNumber | BigNumber.Value,
    stakingToken?: string,
    isWithClaim?: boolean,
  ): Promise<ISendAsyncResult>;

  getClaimableAethBalance(): Promise<BigNumber>;

  claimAETH(): Promise<ISendAsyncResult>;

  getClaimableFethBalance(): Promise<BigNumber>;

  claimFETH(): Promise<ISendAsyncResult>;

  getClaimableAnkrBalance(): Promise<BigNumber>;

  claimAnkr(amount: BigNumber): Promise<ISendAsyncResult>;

  getNativeBalance(): Promise<BigNumber>;

  getDepositedBalance(): Promise<BigNumber>;

  getEthBalance(): Promise<BigNumber>;

  getAnkrBalance(): Promise<BigNumber>;

  getDotBalance(): Promise<BigNumber>;

  getAethBalance(): Promise<BigNumber>;

  getFethBalance(): Promise<BigNumber>;

  getStakerStats(): Promise<IStakerStats>;

  getAethRatio(): Promise<BigNumber>;

  getAllowanceAmount(): Promise<BigNumber>;

  getStakerMinimalStakingAmount(): Promise<BigNumber>;

  getRemainingAllowance(): Promise<BigNumber>;

  getMinimumDeposit(): Promise<BigNumber>;

  crossWithdrawAsync(
    fromToken: string,
    toToken: string,
    fromChain: string,
    fromAddress: string | null,
    withdrawAmount: string,
    txHash: string,
    signature: string,
  ): Promise<any>;

  crossDeposit(
    fromToken: string,
    toToken: string,
    toChain: string,
    toAddress: string | null,
    depositAmount: BigNumber,
  ): Promise<any>;
}

interface IProviderSdk {
  downloadSidecar(sidecar: string, platform: string): void;

  createSidecar(
    name: string,
    eth1Url: string,
    eth2Url?: string,
  ): Promise<ISidecarReply>;

  getProviderSidecars(
    page: string | number,
    size?: string | number,
  ): Promise<ISidecarReply[]>;

  topUpETH(amount: BigNumber): Promise<ISendAsyncResult>;

  topUpANKR(amount: BigNumber): Promise<ISendAsyncResult>;
}

interface IGovernanceSdk {
  isGovernanceSupported(): boolean;

  vote(
    proposalId: string,
    vote: VoteStatus,
    options?: SendOptions,
  ): Promise<any>;

  fetchProjects(): Promise<any>;

  createProject(
    timeSpan: number,
    topic: string,
    content: string,
    options?: SendOptions,
  ): Promise<any>;

  faucet(options?: SendOptions): Promise<any>;

  setAnkrAllowance(amount: string, options?: SendOptions): Promise<any>;

  getAnkrGovernanceAllowance(owner: string): Promise<any>;

  getAnkrAvailableDepositsOf(owner: string): Promise<any>;

  getProposalInfo(proposalId: string): Promise<any>;
}

export interface IStkrSdk extends IStakerSdk, IProviderSdk, IGovernanceSdk {
  createExplorerLink(txHash: string): string;

  authorizeProvider(ttl?: number): Promise<{ token: string }>;

  isAuthorized(token?: string): Promise<boolean>;

  getContractManager(): IContractManager;

  getKeyProvider(): KeyProvider;

  getCrossChainBridge(): CrossChainSdk;

  getWalletMeta(): IWalletMeta | undefined;

  getJssdkManager(): JssdkManager;

  getApiGateway(): ApiGateway;

  getEventEmitter(): EventEmitter;

  connect(): Promise<IConnectResult>;

  isConnected(): boolean;

  disconnect(): Promise<void>;

  currentAccountOrThrow(): string;

  currentAccount(): string;

  getGlobalStats(): Promise<IGlobalStatsReply>;

  notarizeTransfer(
    fromChain: string,
    txHash: string,
  ): Promise<INotarizeTransferReply>;

  getConversionEstimate(
    amount: string,
    token: string,
  ): Promise<IConvertEstimateReply>;

  switchNetwork(chainId: number): Promise<any>;
}

export class StkrSdk implements IStkrSdk {
  private static _cachedSdk: IStkrSdk | undefined;

  public static getForConfig(stkrConfig: IStkrConfig): IStkrSdk {
    const apiGateway = new ApiGateway(stkrConfig.gatewayConfig);
    return new StkrSdk(stkrConfig, apiGateway, new EventEmitter());
  }

  public static getForEnv(): IStkrSdk {
    if (StkrSdk._cachedSdk) return StkrSdk._cachedSdk;
    const stkrConfig = configFromEnv();
    StkrSdk._cachedSdk = StkrSdk.getForConfig(stkrConfig);
    return StkrSdk._cachedSdk;
  }

  private jssdkManager: JssdkManager | null = null;
  private keyProvider: KeyProvider | null = null;
  private contractManager: IContractManager | null = null;
  private crossChainBridge: CrossChainSdk | null = null;

  constructor(
    private stkrConfig: IStkrConfig,
    private apiGateway: ApiGateway,
    private eventEmitter: EventEmitter,
  ) {}

  public getApiGateway(): ApiGateway {
    return this.apiGateway;
  }

  public getEventEmitter(): EventEmitter {
    return this.eventEmitter;
  }

  public getWalletMeta() {
    return this.keyProvider?.walletMeta;
  }

  public async connect(): Promise<IConnectResult> {
    this.keyProvider = new Web3ModalKeyProvider(
      this.stkrConfig.providerConfig,
      this.eventEmitter,
    );
    const result = await this.keyProvider.connect();
    if (this.keyProvider.isAvalancheChain()) {
      this.contractManager = new AvalancheContractManager(
        this.eventEmitter,
        this.keyProvider,
        this.stkrConfig.avalancheConfig,
      );
    } else if (this.keyProvider.isBinanceSmartChain()) {
      if (!this.stkrConfig.binanceConfig) {
        throw new Error(`BSC config is not provided`);
      }
      this.contractManager = new BinanceContractManager(
        this.eventEmitter,
        this.keyProvider,
        this.stkrConfig.binanceConfig,
      );
    } else {
      this.contractManager = new EthereumContractManager(
        this.eventEmitter,
        this.keyProvider,
        this.stkrConfig.contractConfig,
      );
    }
    await this.contractManager.connect();
    this.jssdkManager = new JssdkManager(
      this.keyProvider,
      this.stkrConfig.contractConfig,
    );

    if (SupportedBlockchainNetworkId.includes(result.chainId)) {
      await this.setupCrossChain();
    }

    this.eventEmitter.on(KeyProviderEvents.ChainChanged, async () => {
      await this.setupCrossChain();
    });

    return result;
  }

  async setupCrossChain() {
    if (!this.keyProvider) {
      return;
    }
    this.crossChainBridge?.dispose();
    this.crossChainBridge = await CrossChainSdk.fromConfigFile(
      this.keyProvider,
      this.eventEmitter,
    );
    this.crossChainBridge.listen();
  }

  public isConnected(): boolean {
    return !!this.keyProvider && !!this.contractManager;
  }

  public async disconnect(): Promise<void> {
    try {
      await this.getKeyProvider().disconnect();
    } catch (e) {
      console.error(`Failed to disconnect key provider: ${e}`);
    }
    try {
      await this.getApiGateway().logout();
    } catch (e) {
      console.error(`Failed to disconnect api gateway: ${e}`);
    }
    this.keyProvider = null;
    this.contractManager = null;
    this.crossChainBridge?.dispose();
    this.crossChainBridge = null;
  }

  public createExplorerLink(txHash: string): string {
    const network = Number(this.getKeyProvider().currentNetwork());
    const urls: any = {
      1: 'https://etherscan.io/tx/{value}',
      5: 'https://goerli.etherscan.io/tx/{value}',
      56: 'https://bscscan.com/tx/{value}',
      97: 'https://testnet.bscscan.com/tx/{value}',
    };
    return (urls[network] || '').replace('{value}', txHash);
  }

  private static readonly TWELVE_HOURS = 12 * 60 * 60 * 1000;

  public async authorizeProvider(ttl?: number): Promise<{ token: string }> {
    if (!this.keyProvider) {
      throw new Error('Key provider must be connected');
    }
    const token = await this.keyProvider.signLoginData(
      ttl || StkrSdk.TWELVE_HOURS,
    );
    await this.apiGateway.authorizeWithSignedData(token);
    return { token };
  }

  public async isAuthorized(token?: string): Promise<boolean> {
    const currentAccount = this.getKeyProvider().currentAccount();
    if (this.apiGateway.isAuthorized(currentAccount)) return true;
    const existingToken = token;
    if (!existingToken) return false;
    try {
      const { status } = await this.apiGateway.authorizeWithSignedData(
        existingToken,
      );
      return status === 200;
    } catch (e) {
      console.warn(`unable to verify token: ${e.message}`);
    }
    return false;
  }

  public downloadSidecar(sidecar: string, platform: string): void {
    const downloadLink = this.apiGateway.createSidecarDownloadLink(
      sidecar,
      platform,
    );
    window.open(downloadLink);
  }

  public async createSidecar(
    name: string,
    eth1Url: string,
    eth2Url?: string,
  ): Promise<ISidecarReply> {
    return this.apiGateway.createSidecar(name, eth1Url, eth2Url);
  }

  public async getProviderSidecars(
    page: string | number,
    size?: string | number,
  ): Promise<ISidecarReply[]> {
    return this.apiGateway.getProviderSidecars(page, size);
  }

  public async getAllowanceAmount(): Promise<BigNumber> {
    return await this.getContractManager().checkAnkrAllowance();
  }

  public async getStakerMinimalStakingAmount(): Promise<BigNumber> {
    return this.getContractManager().requesterMinimumStaking();
  }

  public async getRemainingAllowance(): Promise<BigNumber> {
    const allowanceAmount = await this.getAllowanceAmount(),
      minimalStaking = await this.getContractManager().providerMinimumStaking();
    return minimalStaking.minus(allowanceAmount);
  }

  public async getMinimumDeposit(): Promise<BigNumber> {
    return await this.getContractManager().providerMinimumDeposit();
  }

  public async allowTokens(
    remainingAllowance?: BigNumber,
  ): Promise<ISendAsyncResult> {
    if (!remainingAllowance) {
      remainingAllowance = await this.getRemainingAllowance();
    }
    console.log(
      `going to approve ankr to staking contract ${remainingAllowance.toString(
        10,
      )}`,
    );
    return this.getContractManager().approveAnkrToStakingContract(
      remainingAllowance,
    );
  }

  public async waitForAllowance(remainingAllowance?: BigNumber): Promise<void> {
    if (!remainingAllowance) {
      remainingAllowance = await this.getRemainingAllowance();
    }
    return new Promise(resolve => {
      const CHECK_INTERVAL = 5000;
      const checkFunction = async () => {
        const remainingAmount = await this.getRemainingAllowance();
        if (!remainingAmount.lt(remainingAllowance as any)) {
          return;
        }
        resolve();
      };
      setTimeout(checkFunction, CHECK_INTERVAL);
    });
  }

  public async stake(
    stakingAmount: BigNumber | BigNumber.Value,
    stakingToken?: string,
    isWithClaim = false,
  ): Promise<ISendAsyncResult> {
    stakingAmount = new BigNumber(stakingAmount);
    const requesterMinimumStaking = await this.getStakerMinimalStakingAmount();
    if (stakingAmount.isLessThan(requesterMinimumStaking)) {
      throw new Error(
        `Minimum staking amount is ${requesterMinimumStaking.toString(10)}`,
      );
    }
    console.log(`staking funds ${stakingAmount.toString(10)} in global pool`);
    return this.getContractManager().stake(
      stakingAmount,
      stakingToken,
      isWithClaim,
    );
  }

  public currentAccount(): string {
    if (!this.keyProvider) {
      return '';
    }
    return this.keyProvider.currentAccount();
  }

  public currentAccountOrThrow(): string {
    return this.getKeyProvider().currentAccount();
  }

  public async getGlobalStats(): Promise<IGlobalStatsReply> {
    return await this.apiGateway.getGlobalStats();
  }

  public getKeyProvider(): KeyProvider {
    if (!this.keyProvider) throw new Error('Key provider must be connected');
    return this.keyProvider;
  }

  public getCrossChainBridge(): CrossChainSdk {
    if (!this.crossChainBridge)
      throw new Error("Cross chain bridge hasn't been initialized");
    return this.crossChainBridge;
  }

  public getContractManager(): IContractManager {
    if (!this.contractManager)
      throw new Error('Contract manager is not initialized');
    return this.contractManager;
  }

  /**
   * @deprecated
   */
  public getJssdkManager(): JssdkManager {
    if (!this.jssdkManager) throw new Error(`Jssdk is not available`);
    return this.jssdkManager;
  }

  public async getClaimableAethBalance(): Promise<BigNumber> {
    const address = this.getKeyProvider().currentAccount();
    return this.getContractManager().claimableAETHRewardOf(address);
  }

  public async claimAETH(): Promise<ISendAsyncResult> {
    return this.getContractManager().claimAETH();
  }

  public async getClaimableFethBalance(): Promise<BigNumber> {
    const address = this.getKeyProvider().currentAccount();
    return this.getContractManager().claimableFETHRewardOf(address);
  }

  public async claimFETH(): Promise<ISendAsyncResult> {
    return this.getContractManager().claimFETH();
  }

  public async getClaimableAnkrBalance(): Promise<BigNumber> {
    const address = this.getKeyProvider().currentAccount();
    return this.getContractManager().claimableAnkrRewardOf(address);
  }

  public async claimAnkr(amount: BigNumber): Promise<ISendAsyncResult> {
    return this.getContractManager().claimAnkr(amount);
  }

  public async getNativeBalance(): Promise<BigNumber> {
    const currentAccount = this.getKeyProvider().currentAccount();
    const balanceOf = await this.getKeyProvider().getNativeBalance(
      currentAccount,
    );
    return new BigNumber(balanceOf);
  }

  public async getDepositedBalance(): Promise<BigNumber> {
    const currentAccount = this.getKeyProvider().currentAccount();
    return new BigNumber(
      Web3.utils.fromWei(
        await this.getJssdkManager().availableDepositsOf(currentAccount),
      ),
    );
  }

  public async getEthBalance(): Promise<BigNumber> {
    const currentAccount = this.getKeyProvider().currentAccount();
    if (this.getKeyProvider().isAvalancheChain()) {
      return new BigNumber('0');
    }
    return this.getContractManager().etherBalanceOf(currentAccount);
  }

  public async getAnkrBalance(): Promise<BigNumber> {
    const currentAccount = this.getKeyProvider().currentAccount();
    if (
      this.getKeyProvider().isBinanceSmartChain() ||
      this.getKeyProvider().isAvalancheChain()
    ) {
      return new BigNumber('0');
    }
    return this.getContractManager().ankrBalanceOf(currentAccount);
  }

  public async getDotBalance(): Promise<BigNumber> {
    const currentAccount = this.getKeyProvider().currentAccount();
    if (
      this.getKeyProvider().isBinanceSmartChain() ||
      this.getKeyProvider().isAvalancheChain()
    ) {
      return new BigNumber('0');
    }
    return this.getContractManager().dotBalanceOf(currentAccount);
  }

  public async getAethBalance(): Promise<BigNumber> {
    if (this.getKeyProvider().isAvalancheChain()) {
      return new BigNumber('0');
    }
    const currentAccount = this.getKeyProvider().currentAccount();
    return this.getContractManager().aethBalanceOf(currentAccount);
  }

  public async getFethBalance(): Promise<BigNumber> {
    if (this.getKeyProvider().isAvalancheChain()) {
      return new BigNumber('0');
    }
    const currentAccount = this.getKeyProvider().currentAccount();
    return this.getContractManager().fethBalanceOf(currentAccount);
  }

  public async getStakerStats(): Promise<IStakerStats> {
    console.log('fetching stake events from smart contract...');
    const [pending, confirmed, toppedUp, toppedUpAnkr] = await Promise.all([
      this.getContractManager().stakePendingEventLogs(),
      this.getContractManager().stakeConfirmedEventLogs(),
      this.getContractManager().providerToppedUpEthEventLogs(),
      this.getContractManager().providerToppedUpAnkrEventLogs(),
    ]);

    function hasItem(
      items: ContractManagerEvent[],
      item: ContractManagerEvent,
    ) {
      return items.some(
        toppedUpItem =>
          toppedUpItem.data.eventLog.transactionHash ===
          item.data.eventLog.transactionHash,
      );
    }

    const pendingItems = pending.map(
      (item): IUserStakeReply => {
        return {
          user: item.data.staker,
          amount: item.data.amount,
          transactionHash: item.data.eventLog.transactionHash,
          action: 'STAKE_ACTION_PENDING',
          timestamp: item.data.eventLog.blockNumber,
          isTopUp: hasItem(toppedUp, item),
          type: DepositType.ETH,
        };
      },
    );
    const confirmedItems = confirmed.map(
      (item): IUserStakeReply => {
        return {
          user: item.data.staker,
          amount: item.data.amount,
          transactionHash: item.data.eventLog.transactionHash,
          action: 'STAKE_ACTION_CONFIRMED',
          timestamp: item.data.eventLog.blockNumber,
          isTopUp: hasItem(toppedUp, item),
          type: DepositType.ETH,
        };
      },
    );
    const ankrTopUpItems = toppedUpAnkr.map(
      (item): IUserStakeReply => {
        return {
          user: item.data.provider,
          amount: item.data.amount,
          transactionHash: item.data.eventLog.transactionHash,
          action: 'STAKE_ACTION_CONFIRMED',
          timestamp: item.data.eventLog.blockNumber,
          isTopUp: true,
          type: DepositType.ANKR,
        };
      },
    );

    const stakes = [...pendingItems, ...confirmedItems, ...ankrTopUpItems].sort(
      (a, b) => b.timestamp - a.timestamp,
    );

    return { stakes };
  }

  public async topUpETH(amount: BigNumber): Promise<ISendAsyncResult> {
    return await this.getContractManager().topUpETH(amount);
  }

  public async topUpANKR(amount: BigNumber): Promise<ISendAsyncResult> {
    return await this.getContractManager().topUpANKR(amount);
  }

  public async getAethRatio(): Promise<BigNumber> {
    return await this.getContractManager().aethRatio();
  }

  public isGovernanceSupported(): boolean {
    return !this.getKeyProvider().isBinanceSmartChain();
  }

  public async vote(
    proposalId: string,
    vote: VoteStatus,
    options?: SendOptions,
  ) {
    return this.getJssdkManager().vote(proposalId, vote, options);
  }

  public async fetchProjects() {
    return this.getJssdkManager().fetchProjects();
  }

  public async createProject(
    timeSpan: number,
    topic: string,
    content: string,
    options?: SendOptions,
  ) {
    return this.getJssdkManager().createProject(
      timeSpan,
      topic,
      content,
      options,
    );
  }

  public async faucet(options?: SendOptions) {
    return this.getJssdkManager().faucet(options);
  }

  public async setAnkrAllowance(amount: string, options?: SendOptions) {
    return this.getJssdkManager().setAnkrAllowance(amount, options);
  }

  public async getAnkrGovernanceAllowance(owner: string) {
    return this.getJssdkManager().getAnkrGovernanceAllowance(owner);
  }

  public async getAnkrAvailableDepositsOf(owner: string) {
    return await this.getContractManager().getAnkrAvailableDepositsOf(owner);
  }

  public async getProposalInfo(proposalId: string) {
    return this.getJssdkManager().getProposalInfo(proposalId);
  }

  public async notarizeTransfer(fromChain: string, txHash: string) {
    return await this.apiGateway.notarizeTransfer({
      fromChain: fromChain,
      transactionHash: txHash,
    });
  }

  public async getConversionEstimate(amount: string, token: string) {
    const scaledAmount = new BigNumber(amount).multipliedBy(1e18);
    return await this.apiGateway.getConversionEstimate(
      scaledAmount.toString(10),
      token,
    );
  }

  public async switchNetwork(chainId: number): Promise<any> {
    return await this.keyProvider?.switchNetwork(chainId);
  }

  public async crossWithdrawAsync(
    fromToken: string,
    toToken: string,
    fromChain: string,
    fromAddress: string | null,
    withdrawAmount: string,
    txHash: string,
    signature: string,
  ): Promise<any> {
    if (!this.crossChainBridge) {
      throw new Error('Cross chain bridge not available');
    }
    return await this.crossChainBridge.withdrawAsync(
      fromToken,
      toToken,
      fromChain,
      fromAddress,
      withdrawAmount,
      txHash,
      signature,
    );
  }

  public async crossDeposit(
    fromToken: string,
    toToken: string,
    toChain: string,
    toAddress: string | null,
    depositAmount: BigNumber,
  ): Promise<any> {
    if (!this.crossChainBridge) {
      throw new Error('Cross chain bridge not available');
    }
    return await this.crossChainBridge.deposit(
      fromToken,
      toToken,
      toChain,
      toAddress,
      depositAmount,
    );
  }
}
