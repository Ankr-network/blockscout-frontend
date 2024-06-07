import BigNumber from 'bignumber.js';
import { Contract, EventData } from 'web3-eth-contract';
import { TBlockchain } from '@ankr.com/advanced-api/src/api/getLogs/types';
import { Web3KeyReadProvider } from '@ankr.com/provider';

import ABI_ANKR_TOKEN from './abi/AnkrToken.json';
import ABI_PAY_AS_YOU_GO from './abi/PayAsYouGo.json';
import { GAS_LIMIT } from './const';
import { IAnkrPAYGContractManagerConfig } from './types';
import { IAnkrToken } from './abi/IAnkrToken';
import { IPayAsYouGoEvents } from './abi/IPayAsYouGo';
import { PrefixedHex, Web3Address } from '../common';
import { getPastEventsBlockchain } from './utils/getPastEventsBlockchain';
import { roundDecimals } from '../utils';

export class PAYGReadContractManager {
  protected readonly ankrTokenReadContract: Contract;

  protected readonly payAsYouGoReadContract: Contract;

  constructor(
    protected readonly keyReadProvider: Web3KeyReadProvider,
    protected readonly config: IAnkrPAYGContractManagerConfig,
  ) {
    this.ankrTokenReadContract = keyReadProvider.createContract(
      ABI_ANKR_TOKEN,
      config.payAsYouGoAnkrTokenContractAddress,
    );

    this.payAsYouGoReadContract = keyReadProvider.createContract(
      ABI_PAY_AS_YOU_GO,
      config.payAsYouGoContractAddress,
    );
  }

  private async getLatestUserEventLogs(
    event: IPayAsYouGoEvents,
    user: Web3Address,
    blockchain: TBlockchain
  ) {
    const contract = this.payAsYouGoReadContract;
    const startBlock = this.config.payAsYouGoContractCreationBlockNumber;

    const latestBlockNumber = await this.keyReadProvider
      .getWeb3()
      .eth.getBlockNumber();

    return getPastEventsBlockchain({
      web3: this.keyReadProvider.getWeb3(),
      blockchain,
      contract,
      eventName: event,
      filter: {
        sender: user,
      },
      startBlock,
      latestBlockNumber,
      apiUrl: this.config.advancedApiUrl,
    });
  }

  public async getAllLatestUserTierAssignedEventLogHashes(
    user: Web3Address,
    blockchain: TBlockchain
  ): Promise<string[] | false> {
    const tierAssignedEvents = await this.getLatestUserEventLogs(
      'TierAssigned',
      user,
      blockchain,
    );

    if (!tierAssignedEvents.length) return false;

    return tierAssignedEvents.map(item => item.transactionHash);
  }

  public async getLatestUserTierAssignedEventLogHash(
    user: Web3Address,
    blockchain: TBlockchain
  ): Promise<PrefixedHex | false> {
    const tierAssignedEvents = await this.getLatestUserEventLogs(
      'TierAssigned',
      user,
      blockchain
    );

    if (!tierAssignedEvents.length) return false;

    return tierAssignedEvents[tierAssignedEvents.length - 1].transactionHash;
  }

  public async getLatestLockedFundsEvents(
    user: Web3Address,
    blockchain: TBlockchain
  ): Promise<EventData[]> {
    return this.getLatestUserEventLogs(
      'FundsLocked',
      user,
      blockchain,
    );
  }

  public async getLatestAllowanceEvents(
    user: Web3Address,
  ): Promise<EventData[]> {
    const events = await this.ankrTokenReadContract.getPastEvents('Approval', {
      filter: {
        owner: user,
      },
      fromBlock: 'earliest',
      toBlock: 'latest',
    });

    const allowanceEvents = events
      .filter(event => event.returnValues.owner === user)
      .sort((a, b) => a.blockNumber - b.blockNumber);

    return allowanceEvents;
  }

  async getBalance(accountAddress: Web3Address) {
    return (this.ankrTokenReadContract.methods as IAnkrToken)
      .balanceOf(accountAddress)
      .call();
  }

  async estimateAllowanceFee(amount: BigNumber, from: Web3Address) {
    const amountString = amount.toString(10);
    const gas = Number(GAS_LIMIT);
    const to = this.config.payAsYouGoContractAddress;

    const gasAmount = await (this.ankrTokenReadContract.methods as IAnkrToken)
      .approve(to, amountString)
      .estimateGas({ from, gas });

    const gasPrice = await this.keyReadProvider.getSafeGasPriceWei();

    const feeWei = gasPrice.multipliedBy(gasAmount);

    return this.keyReadProvider.getWeb3().utils.fromWei(feeWei.toString());
  }

  async estimateDepositFee(amount: BigNumber, from: Web3Address) {
    const amountString = roundDecimals(amount).toString(10);
    const gas = Number(GAS_LIMIT);
    const to = this.config.payAsYouGoContractAddress;

    const gasAmount = await (this.ankrTokenReadContract.methods as IAnkrToken)
      .transfer(to, amountString)
      .estimateGas({ from, gas });

    const gasPrice = await this.keyReadProvider.getSafeGasPriceWei();

    const feeWei = gasPrice.multipliedBy(gasAmount);

    return this.keyReadProvider.getWeb3().utils.fromWei(feeWei.toString());
  }
}
