import { Contract, EventData } from 'web3-eth-contract';
import { Web3KeyReadProvider } from '@ankr.com/provider';

import { Web3Address } from '../common';
import ABI_USDC_TOKEN from './abi/UsdcToken.json';
import ABI_PAY_AS_YOU_GO_COMMON from './abi/PayAsYouGoCommon.json';
import { IPayAsYouGoCommonEvents } from './abi/IPayAsYouGoCommon';
import { getPastEventsBlockchain } from './utils/getPastEventsBlockchain';

export class UsdcPAYGReadContractManager {
  protected readonly usdcTokenReadContract: Contract;

  protected readonly payAsYouGoReadContract: Contract;

  constructor(
    protected readonly keyReadProvider: Web3KeyReadProvider,
    protected readonly tokenAddress: Web3Address,
    protected readonly depositContractAddress: Web3Address,
  ) {
    this.usdcTokenReadContract = keyReadProvider.createContract(
      ABI_USDC_TOKEN,
      tokenAddress,
    );

    this.payAsYouGoReadContract = keyReadProvider.createContract(
      ABI_PAY_AS_YOU_GO_COMMON,
      depositContractAddress,
    );
  }

  private async getLatestUserEventLogs(
    event: IPayAsYouGoCommonEvents,
    user: Web3Address,
  ) {
    const contract = this.payAsYouGoReadContract;
    // TODO: pass start block depending on blockchain
    // const startBlock = this.config.payAsYouGoContractCreationBlockNumber;
    const startBlock = 0;

    const latestBlockNumber = await this.keyReadProvider
      .getWeb3()
      .eth.getBlockNumber();

    return getPastEventsBlockchain({
      web3: this.keyReadProvider.getWeb3(),
      contract,
      eventName: event,
      filter: {
        sender: user,
      },
      startBlock,
      latestBlockNumber,
      apiUrl:
        'https://rpc.ankr.com/multichain/f8e4e17caa0ff53dbba438d87f25bb8d29734490c488292c062cf020be629a98',
    });
  }

  public async getLatestAllowanceEvents(
    user: Web3Address,
  ): Promise<EventData[]> {
    const events = await this.usdcTokenReadContract.getPastEvents('Approval', {
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
}
