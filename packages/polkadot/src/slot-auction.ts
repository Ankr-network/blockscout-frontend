/* eslint-disable no-console */
import BigNumber from 'bignumber.js';
import { IWeb3SendResult, Web3KeyWriteProvider } from 'common';
import { Contract } from 'web3-eth-contract';
import ABI_IERC20 from './abi/IERC20.json';
import { DEVELOP_CONFIG, ISlotAuctionConfig } from './config';
import { ContractManager } from './contract';
import {
  EClaimStatuses,
  ICrowdloanType,
  TClaimMethod,
  TCrowdloanStatus,
  TEthereumAddress,
  TPolkadotAddress,
} from './entity';
import { ApiGateway } from './gateway';
import { PolkadotProvider } from './polkadot';

const isZeroAddress = (address: string): boolean =>
  address === '0x0000000000000000000000000000000000000000';

export class SlotAuctionSdk {
  private keyProvider: Web3KeyWriteProvider;

  private polkadotProvider: PolkadotProvider;

  private readonly apiGateway: ApiGateway;

  public constructor(
    keyProvider: Web3KeyWriteProvider,
    private readonly config: ISlotAuctionConfig = DEVELOP_CONFIG,
  ) {
    this.keyProvider = keyProvider;
    this.polkadotProvider = new PolkadotProvider({
      polkadotUrl: this.config.polkadotUrl,
      networkType: this.config.networkType,
    });
    this.apiGateway = new ApiGateway({
      baseUrl: config.baseUrl,
      cacheAge: config.cacheAge,
    });
  }

  public getKeyProvider(): Web3KeyWriteProvider {
    return this.keyProvider;
  }

  public getApiGateway(): ApiGateway {
    return this.apiGateway;
  }

  public getPolkadotProvider(): PolkadotProvider {
    return this.polkadotProvider;
  }

  public isConnected(): boolean {
    return this.polkadotProvider.isAPIConnected();
  }

  public async connect(): Promise<void> {
    console.log(`Checking PolkadotJS is connected`);
    await this.polkadotProvider.connect();
  }

  public async getAvailableCrowdloans(): Promise<ICrowdloanType[]> {
    const currentNetwork = await this.polkadotProvider.getNetworkType();
    return this.apiGateway.getCrowdloans({
      network: currentNetwork,
    });
  }

  public async getCrowdloansByStatus(
    status: TCrowdloanStatus,
  ): Promise<ICrowdloanType[]> {
    const currentNetwork = await this.polkadotProvider.getNetworkType();
    return this.apiGateway.getCrowdloans({
      network: currentNetwork,
      status,
    });
  }

  public async checkCrowdloanStatus(
    crowdloan: ICrowdloanType,
    status: TCrowdloanStatus,
  ): Promise<void> {
    if (!this.config.crowdloanStatusCheck) return;
    if (crowdloan.status !== status)
      throw new Error(
        `Incorrect crowdloan status, should be ${status} instead of ${crowdloan.status}`,
      );
  }

  public async getCrowdloanById(loanId: number): Promise<ICrowdloanType> {
    const currentNetwork = await this.polkadotProvider.getNetworkType();
    return this.apiGateway.getCrowdloanById({
      network: currentNetwork,
      loanId,
    });
  }

  public async getPolkadotAccounts(): Promise<string[]> {
    return this.polkadotProvider.getAccounts();
  }

  public async getPolkadotBalance(account: string): Promise<BigNumber> {
    const { free } = await this.polkadotProvider.getAccountBalance(account);
    return free;
  }

  public async getEthereumAccount(): Promise<string> {
    const keyProvider = await this.injectedWeb3KeyProvider();
    return keyProvider.currentAccount;
  }

  public async requestDepositAddress(loanId: number): Promise<string> {
    await this.checkCrowdloanStatus(
      await this.getCrowdloanById(loanId),
      'ONGOING',
    );
    const currentNetwork = await this.polkadotProvider.getNetworkType();
    const { address } = await this.apiGateway.crowdloanDepositAddress({
      network: currentNetwork,
      loanId,
    });
    return address;
  }

  public async depositFundsToCrowdloan(
    polkadotAccount: string,
    loanId: number,
    amount: BigNumber,
  ): Promise<void> {
    if (!this.polkadotProvider.isAPIConnected())
      throw new Error(`Polkadot must be connected`);
    await this.checkCrowdloanStatus(
      await this.getCrowdloanById(loanId),
      'ONGOING',
    );
    const currentNetwork = await this.polkadotProvider.getNetworkType();
    const { address } = await this.apiGateway.crowdloanDepositAddress({
      network: currentNetwork,
      loanId,
    });
    const { extId, transactionHash, blockHash } =
      await this.polkadotProvider.sendFundsWithExtrinsic(
        polkadotAccount,
        address,
        amount,
      );
    console.log(
      `Transaction is sent to block ${blockHash} with ext ${extId} and transaction hash ${transactionHash}`,
    );
    const { id, status } = await this.apiGateway.deposit({
      network: currentNetwork,
      extrinsic: extId,
    });
    console.log(`Deposits with id ${id} and status ${status}`);
  }

  public async getCrowdloanBalances(polkadotAccount: string): Promise<
    {
      loanId: number;
      total: BigNumber;
      claimable: BigNumber;
    }[]
  > {
    const currentNetwork = await this.polkadotProvider.getNetworkType();
    const { balances } = await this.apiGateway.getCrowdloanBalances({
      network: currentNetwork,
      address: polkadotAccount,
    });
    return balances;
  }

  private async checkBalanceBeforeClaim(
    polkadotAccount: string,
    loanId: number,
  ): Promise<{ claimable: BigNumber; total: BigNumber }> {
    if (!this.polkadotProvider.isAPIConnected())
      throw new Error(`Polkadot must be connected`);
    const crowdloan = await this.getCrowdloanById(loanId);
    await this.checkCrowdloanStatus(crowdloan, 'SUCCEEDED');
    if (
      crowdloan.bondTokenContract.length !== 42 ||
      crowdloan.bondTokenContract ===
        '0x0000000000000000000000000000000000000000'
    ) {
      throw new Error(
        'Attempt to claim tokens when there is no smart-contract',
      );
    }
    const currentNetwork = await this.polkadotProvider.getNetworkType();
    const { balances } = await this.apiGateway.getCrowdloanBalances({
      network: currentNetwork,
      address: polkadotAccount,
      loanId,
    });
    const [balance] = balances.filter(b => b.loanId === loanId);
    if (!balance)
      throw new Error(`There is no balance for crowdloan ${loanId}`);
    const { total, claimable } = balance;
    console.log(
      `Current account balance for loan ${loanId} is: total=${total.toString(
        10,
      )}, claimable=${claimable.toString(10)}`,
    );
    if (claimable.isZero()) throw new Error(`Claimable balance is zero`);
    return { total, claimable };
  }

  public async claimRewardPoolTokensOnchain(
    polkadotAccount: TPolkadotAddress,
    loanId: number,
    ethereumAddress?: TEthereumAddress,
  ): Promise<{
    transactionHash: string;
    transactionReceipt: any;
  }> {
    const { claimable } = await this.checkBalanceBeforeClaim(
      polkadotAccount,
      loanId,
    );
    const keyProvider = await this.injectedWeb3KeyProvider();
    if (!ethereumAddress) {
      ethereumAddress = keyProvider.currentAccount;
    }
    const currentNetwork = await this.polkadotProvider.getNetworkType();
    if (claimable.isZero()) throw new Error(`Claimable balance is zero`);

    let claims = await this.apiGateway.getRewardClaims({
      network: currentNetwork,
      address: polkadotAccount,
      loanId,
    });
    if (claims.some(c => c.claim.status === EClaimStatuses.Active)) {
      throw new Error(
        `Address ${polkadotAccount} already has active claim for crowdloan ${loanId}`,
      );
    }
    const polkadotDecimals = this.polkadotProvider.getNetworkMaxDecimals();
    const scaledAmount = claimable.multipliedBy(10 ** polkadotDecimals);

    const data = PolkadotProvider.getClaimTransactionPayload(
      ethereumAddress,
      loanId,
      scaledAmount,
    );
    const {
      extId,
      transactionHash: extrinsicHash,
      blockHash,
    } = await this.polkadotProvider.sendSystemRemarkWithExtrinsic(
      polkadotAccount,
      data,
    );
    console.log(
      `Transaction (system.remark) is sent to block ${blockHash} with ext ${extId} and transaction hash ${extrinsicHash}`,
    );

    const sleep = (ms: number) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };
    await sleep(3000); // This is small hack to allow backend to process transaction in case of race conditions

    claims = await this.apiGateway.getRewardClaims({
      network: currentNetwork,
      address: polkadotAccount,
      loanId,
    });
    const active = claims.filter(c => c.claim.status === EClaimStatuses.Active);
    if (active.length !== 1) {
      throw new Error(
        `Internal error: no active claims for ${polkadotAccount} for crowdloan ${loanId} after onchain request`,
      );
    }
    const [{ claim, tokenAddress }] = active;

    const contractManager = new ContractManager(keyProvider, {
      rewardPoolAddress: tokenAddress,
    });
    const { receiptPromise, transactionHash } =
      await contractManager.claimTokensFor(
        claim.data.claimId,
        scaledAmount,
        claim.data.claimBeforeBlock,
        ethereumAddress,
        claim.data.signature,
      );
    const transactionReceipt = await receiptPromise;
    return { transactionReceipt, transactionHash };
  }

  public async claimRewardPoolTokens(
    polkadotAccount: TPolkadotAddress,
    loanId: number,
    ethereumAddress?: TEthereumAddress,
  ): Promise<{
    transactionHash: string;
    transactionReceipt: any;
  }> {
    const { claimable } = await this.checkBalanceBeforeClaim(
      polkadotAccount,
      loanId,
    );
    const keyProvider = await this.injectedWeb3KeyProvider();
    if (!ethereumAddress) {
      ethereumAddress = keyProvider.currentAccount;
    }
    const currentNetwork = await this.polkadotProvider.getNetworkType();
    if (claimable.isZero()) throw new Error(`Claimable balance is zero`);
    // create signature
    const expirationTimestamp = new Date().getTime() + 10_000 * 60; // 10 minutes (seconds);
    const sigOrToken64 = await this.polkadotProvider.getRawTokenSignature(
      polkadotAccount,
      ethereumAddress,
      expirationTimestamp,
    );
    // request crowdloan claim
    const { claim, tokenAddress } = await this.apiGateway.crowdloanClaim({
      network: currentNetwork,
      address: polkadotAccount,
      ethAddress: ethereumAddress,
      amount: claimable,
      timestamp: expirationTimestamp,
      signature: sigOrToken64,
      loanId,
    });
    // claim tokens
    const contractManager = new ContractManager(keyProvider, {
      rewardPoolAddress: tokenAddress,
    });
    const polkadotDecimals = this.polkadotProvider.getNetworkMaxDecimals();
    // aDOTp has the same scale factor as native polkadot tokens
    const scaledAmount = claim.data.amount
      .multipliedBy(10 ** polkadotDecimals)
      .toString(10);
    const { receiptPromise, transactionHash } =
      await contractManager.claimTokensFor(
        claim.data.claimId,
        scaledAmount,
        claim.data.claimBeforeBlock,
        ethereumAddress,
        claim.data.signature,
      );
    const transactionReceipt = await receiptPromise;
    return { transactionReceipt, transactionHash };
  }

  public async createVerifiableTokenSignature(
    polkadotAccount: TPolkadotAddress,
    ethereumAddress: TEthereumAddress,
    expirationTimestamp: number,
  ): Promise<string> {
    if (!this.polkadotProvider.isAPIConnected())
      throw new Error(`Polkadot must be connected`);
    const signature = await this.polkadotProvider.getRawTokenSignature(
      polkadotAccount,
      ethereumAddress,
      expirationTimestamp,
    );
    const tokenBase64 = Buffer.from(
      [
        `polkadotAddress=${polkadotAccount}`,
        `ethereumAddress=${ethereumAddress}`,
        `expirationTimestamp=${expirationTimestamp}`,
        `signature=${signature}`,
      ].join('&'),
      'ascii',
    ).toString('base64');
    console.log(`New signature is: ${signature}`);
    console.log(`New token is: ${tokenBase64}`);
    return tokenBase64;
  }

  public async getRewardPoolBalances(account: string): Promise<
    {
      loanId: number;
      balance: BigNumber;
    }[]
  > {
    const result = [];
    const crowdloans = await this.getAvailableCrowdloans();
    const keyProvider = await this.injectedWeb3KeyProvider();
    // eslint-disable-next-line no-restricted-syntax
    for (const c of crowdloans) {
      if (isZeroAddress(c.bondTokenContract)) {
        // eslint-disable-next-line no-continue
        continue;
      }
      const contractManager = new ContractManager(keyProvider, {
        rewardPoolAddress: c.bondTokenContract,
      });
      // TODO Please to resolve the issue with this line
      // eslint-disable-next-line no-await-in-loop
      const balance = await contractManager.getRewardPoolBalance(account);
      result.push({
        loanId: c.loanId,
        balance,
      });
    }
    return result;
  }

  public async getRewardPoolBalance(
    loanId: number,
    account: string,
  ): Promise<BigNumber> {
    const crowdloan = await this.getCrowdloanById(loanId);
    if (isZeroAddress(crowdloan.bondTokenContract)) {
      return new BigNumber('0');
    }
    const keyProvider = await this.injectedWeb3KeyProvider();
    const contractManager = new ContractManager(keyProvider, {
      rewardPoolAddress: crowdloan.bondTokenContract,
    });
    return contractManager.getRewardPoolBalance(account);
  }

  public async getStakingTokenBalances(account: string): Promise<
    {
      loanId: number;
      balance: BigNumber;
    }[]
  > {
    const result = [];
    const crowdloans = await this.getAvailableCrowdloans();
    const keyProvider = await this.injectedWeb3KeyProvider();
    // eslint-disable-next-line no-restricted-syntax
    for (const c of crowdloans) {
      if (isZeroAddress(c.bondTokenContract)) {
        // eslint-disable-next-line no-continue
        continue;
      }
      const contractManager = new ContractManager(keyProvider, {
        rewardPoolAddress: c.bondTokenContract,
      });
      // TODO Please to resolve the issue with this line
      // eslint-disable-next-line no-await-in-loop
      const balance = await contractManager.getStakingTokenBalance(account);
      result.push({
        loanId: c.loanId,
        balance,
      });
    }
    return result;
  }

  public async getStakingTokenBalance(
    loanId: number,
    account: string,
  ): Promise<BigNumber> {
    const crowdloan = await this.getCrowdloanById(loanId);
    if (isZeroAddress(crowdloan.bondTokenContract)) {
      return new BigNumber('0');
    }
    const keyProvider = await this.injectedWeb3KeyProvider();
    const contractManager = new ContractManager(keyProvider, {
      rewardPoolAddress: crowdloan.bondTokenContract,
    });
    return contractManager.getStakingTokenBalance(account);
  }

  public async getClaimableStakingRewards(): Promise<
    { loanId: number; amount: BigNumber }[]
  > {
    const availableClaims = [];
    const currentNetwork = await this.polkadotProvider.getNetworkType();
    const crowdloans = await this.apiGateway.getCrowdloans({
      network: currentNetwork,
    });
    const keyProvider = await this.injectedWeb3KeyProvider();
    const account = keyProvider.currentAccount;
    // eslint-disable-next-line no-restricted-syntax
    for (const crowdloan of crowdloans) {
      if (isZeroAddress(crowdloan.bondTokenContract)) {
        // eslint-disable-next-line no-continue
        continue;
      }
      const contractManager = new ContractManager(keyProvider, {
        rewardPoolAddress: crowdloan.bondTokenContract,
      });
      // TODO Please to resolve the issue with this line
      // eslint-disable-next-line no-await-in-loop
      const rewards: BigNumber = await contractManager.claimableRewardsOf(
        crowdloan.rewardTokenSymbol,
        account,
      );
      if (rewards.isZero()) {
        // eslint-disable-next-line no-continue
        continue;
      }
      availableClaims.push({
        loanId: crowdloan.loanId,
        amount: rewards,
      });
    }
    return availableClaims;
  }

  public async getClaimMethodsForStakingRewards(
    loanId: number,
  ): Promise<TClaimMethod[]> {
    await this.checkCrowdloanStatus(
      await this.getCrowdloanById(loanId),
      'SUCCEEDED',
    );
    const crowdloan = await this.getCrowdloanById(loanId);
    if (isZeroAddress(crowdloan.bondTokenContract)) {
      return [];
    }
    const keyProvider = await this.injectedWeb3KeyProvider();
    const contractManager = new ContractManager(keyProvider, {
      rewardPoolAddress: crowdloan.bondTokenContract,
    });
    const claimMethods: TClaimMethod[] = [];
    const isTokenClaim = await contractManager.isTokenClaim();
    if (isTokenClaim) {
      claimMethods.push('ERC20');
    }
    const isParachainClaim = await contractManager.isParachainClaim();
    if (isParachainClaim) {
      claimMethods.push('PARACHAIN');
    }
    return claimMethods;
  }

  public async claimStakingRewards(
    toAccount: string,
    loanId: number,
    claimMethod?: TClaimMethod,
  ): Promise<{
    transactionHash: string;
    transactionReceipt: any;
  }> {
    const crowdloan = await this.getCrowdloanById(loanId);
    if (isZeroAddress(crowdloan.bondTokenContract)) {
      throw new Error(`Not available because bond contract is not set`);
    }
    const keyProvider = await this.injectedWeb3KeyProvider();
    const contractManager = new ContractManager(keyProvider, {
      rewardPoolAddress: crowdloan.bondTokenContract,
    });
    const availableClaimMethods = await this.getClaimMethodsForStakingRewards(
      loanId,
    );
    if (!claimMethod) {
      if (availableClaimMethods.length !== 1) {
        throw new Error(
          `Unable to detect claim mode, please choose one of available: ${availableClaimMethods.join(
            ', ',
          )}`,
        );
      }
      // eslint-disable-next-line prefer-destructuring
      claimMethod = availableClaimMethods[0];
    }
    if (!availableClaimMethods.includes(claimMethod)) {
      throw new Error(`Not supported claim method: ${claimMethod}`);
    }
    let sendResult: IWeb3SendResult;
    if (claimMethod === 'ERC20') {
      sendResult = await contractManager.claimTokenRewards();
    } else if (claimMethod === 'PARACHAIN') {
      sendResult = await contractManager.claimParachainRewards(toAccount);
    } else {
      throw new Error(`Not supported claim method: ${claimMethod}`);
    }
    const transactionReceipt = await sendResult.receiptPromise;
    return { transactionReceipt, transactionHash: sendResult.transactionHash };
  }

  private async injectedWeb3KeyProvider(): Promise<Web3KeyWriteProvider> {
    if (this.keyProvider.isConnected()) {
      return this.keyProvider;
    }

    try {
      await this.keyProvider.inject();
    } catch {
      throw new Error('Web3 must be injected');
    }

    await this.keyProvider.connect();

    return this.keyProvider;
  }

  public async addCrowdloanAssetsToMetaMask(
    loanId: number,
    isBondToken = true,
  ): Promise<void> {
    const keyProvider: Web3KeyWriteProvider =
      await this.injectedWeb3KeyProvider();
    const crowdloan: ICrowdloanType = await this.getCrowdloanById(loanId);

    let tokenAddr: string | null;

    if (isBondToken) {
      tokenAddr = isZeroAddress(crowdloan.bondTokenContract)
        ? null
        : crowdloan.bondTokenContract;
    } else {
      tokenAddr = isZeroAddress(crowdloan.rewardTokenContract)
        ? null
        : crowdloan.rewardTokenContract;
    }

    if (tokenAddr === null) {
      return;
    }

    const tokenContract: Contract = keyProvider.createContract(
      ABI_IERC20,
      tokenAddr,
    );

    const decimals: number = parseInt(
      await tokenContract.methods.decimals().call(),
      10,
    );
    const symbol: string = await tokenContract.methods.symbol().call();
    const image: string = crowdloan.projectLogo;

    await keyProvider.watchAsset({
      type: 'ERC20',
      address: tokenAddr,
      symbol,
      decimals,
      image,
    });
  }
}
