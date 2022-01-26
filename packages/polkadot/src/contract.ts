import BigNumber from 'bignumber.js';
import bs58 from 'bs58';
import { IWeb3SendResult, Web3KeyProvider } from 'provider';
import { Contract } from 'web3-eth-contract';
import ABI_IERC20 from './abi/IERC20.json';
import ABI_REWARD_POOL from './abi/RewardPool.json';

const upscale = (
  value: BigNumber | BigNumber.Value,
  decimals = 18,
): BigNumber => {
  return new BigNumber(value).multipliedBy(10 ** decimals);
};

const downscale = (
  value: BigNumber | BigNumber.Value,
  decimals = 18,
): BigNumber => {
  return new BigNumber(value).dividedBy(10 ** decimals);
};

const getTokenDecimals = (tokenSymbol?: string): number => {
  switch (tokenSymbol) {
    case 'ACA':
      return 12;

    default:
      return 18;
  }
};

export class ContractManager {
  private readonly rewardPool: Contract;

  public constructor(
    private readonly keyProvider: Web3KeyProvider,
    config: {
      rewardPoolAddress: string;
    },
  ) {
    this.rewardPool = keyProvider.createContract(
      ABI_REWARD_POOL,
      config.rewardPoolAddress,
    );
  }

  public async getRewardPoolBalance(account: string): Promise<BigNumber> {
    return this.keyProvider.getTokenBalance(this.rewardPool, account);
  }

  public async getStakingTokenBalance(account: string): Promise<BigNumber> {
    const rewardToken = await this.rewardPool.methods.getStakingToken().call();
    const rewardTokenContract = this.keyProvider.createContract(
      ABI_IERC20,
      rewardToken,
    );
    return this.keyProvider.getTokenBalance(rewardTokenContract, account);
  }

  public async getRewardPayouts(): Promise<
    {
      payoutType: 'Unknown' | 'Uniform';
      totalRewards: BigNumber;
      fromBlock: number;
      durationBlocks: number;
    }[]
  > {
    const rawRewardPayouts = await this.rewardPool.methods
      .getRewardPayouts()
      .call();
    return rawRewardPayouts.map((payout: any) => {
      return {
        payoutType: payout.payoutType === '1' ? 'Uniform' : 'Unknown',
        totalRewards: downscale(payout.totalRewards),
        fromBlock: Number(payout.fromBlock),
        durationBlocks: Number(payout.durationBlocks),
      };
    });
  }

  public async initZeroRewardPayout(
    maxSupply: string,
    payoutType: string,
    fromBlock: string,
    toBlockExclusive: string,
    amount: string,
  ): Promise<IWeb3SendResult> {
    const sender = this.keyProvider.getCurrentAccount();
    const data = this.rewardPool.methods
      .initZeroRewardPayout(
        maxSupply,
        payoutType,
        fromBlock,
        toBlockExclusive,
        upscale(amount).toString(10),
      )
      .encodeABI();
    return this.keyProvider.sendTransactionAsync(
      sender,
      this.rewardPool.options.address,
      {
        data,
        estimate: true,
      },
    );
  }

  public async depositRewardPayout(
    payoutType: string,
    fromBlock: string,
    toBlockExclusive: string,
    amount: string,
  ): Promise<IWeb3SendResult> {
    const sender = this.keyProvider.getCurrentAccount();
    const data = this.rewardPool.methods
      .depositRewardPayout(
        payoutType,
        fromBlock,
        toBlockExclusive,
        upscale(amount).toString(10),
      )
      .encodeABI();
    return this.keyProvider.sendTransactionAsync(
      sender,
      this.rewardPool.options.address,
      {
        data,
        estimate: true,
      },
    );
  }

  public async isClaimUsed(claimId: string): Promise<boolean> {
    const result = await this.rewardPool.methods.isClaimUsed(claimId).call();
    return Boolean(result);
  }

  public async claimTokensFor(
    claimId: string,
    scaledAmount: BigNumber | BigNumber.Value,
    claimBeforeBlock: number,
    account: string,
    signature: string,
  ): Promise<IWeb3SendResult> {
    const makePrefixed = (val: string): string => {
      if (!val.startsWith('0x')) return `0x${val}`;
      return val;
    };
    const sender = this.keyProvider.getCurrentAccount();
    const data = this.rewardPool.methods
      .claimTokensFor(
        makePrefixed(claimId),
        scaledAmount.toString(10),
        claimBeforeBlock,
        account,
        makePrefixed(signature),
      )
      .encodeABI();
    return this.keyProvider.sendTransactionAsync(
      sender,
      this.rewardPool.options.address,
      {
        data,
        estimate: true,
      },
    );
  }

  public async claimableRewardsOf(
    rewardTokenSymbol: string,
    account?: string,
  ): Promise<BigNumber> {
    if (!account) account = this.keyProvider.getCurrentAccount();
    const rawRewardPayouts: string = await this.rewardPool.methods
      .claimableRewardsOf(account)
      .call();
    const tokenDecimals: number = getTokenDecimals(rewardTokenSymbol);
    return downscale(rawRewardPayouts, tokenDecimals);
  }

  public async getRewardPoolSymbol(): Promise<string> {
    return this.rewardPool.methods.symbol().call();
  }

  public async getStakingTokenSymbol(): Promise<string> {
    const stakingTokenAddress = await this.rewardPool.methods
      .getStakingToken()
      .call();
    const rewardTokenContract = this.keyProvider.createContract(
      ABI_REWARD_POOL,
      stakingTokenAddress,
    );
    return rewardTokenContract.methods.symbol().call();
  }

  public async isTokenClaim(): Promise<boolean> {
    const result = await this.rewardPool.methods.isTokenClaim().call();
    return Boolean(result);
  }

  public async isParachainClaim(): Promise<boolean> {
    const result = await this.rewardPool.methods.isParachainClaim().call();
    return Boolean(result);
  }

  public async claimTokenRewards(): Promise<IWeb3SendResult> {
    const sender = this.keyProvider.getCurrentAccount();
    const data = this.rewardPool.methods.claimTokenRewards().encodeABI();
    return this.keyProvider.sendTransactionAsync(
      sender,
      this.rewardPool.options.address,
      {
        data,
        estimate: true,
      },
    );
  }

  public async claimParachainRewards(
    toAddress: string,
  ): Promise<IWeb3SendResult> {
    // TODO: Added a quick fix for the release. Please fix it in the future
    const recipientHex = `0x${ContractManager.extractAddressIntoHex(
      toAddress,
    )}`;
    const sender = this.keyProvider.getCurrentAccount();
    const data = this.rewardPool.methods
      .claimParachainRewards(recipientHex)
      .encodeABI();
    return this.keyProvider.sendTransactionAsync(
      sender,
      this.rewardPool.options.address,
      {
        data,
        estimate: true,
      },
    );
  }

  protected static extractAddressIntoHex(address: string): string {
    if (address.startsWith('0x')) address = address.slice(2);
    if (/^[a-fA-F0-9]{40}$/.test(address)) {
      return address.toLowerCase();
    }
    return bs58
      .decode(address)
      .toString('hex')
      .slice(2, 2 + 64);
  }
}
