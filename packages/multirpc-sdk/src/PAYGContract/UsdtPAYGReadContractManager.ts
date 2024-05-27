import { Contract, EventData } from 'web3-eth-contract';
import { ProviderManager, Web3KeyReadProvider } from '@ankr.com/provider';

import { EBlockchain, Web3Address } from '../common';
import ABI_USDT_TOKEN from './abi/UsdtToken.json';
import ABI_PAY_AS_YOU_GO_COMMON from './abi/PayAsYouGoCommon.json';
import { IUsdtToken } from './abi/IUsdtToken';
import { getReadProviderByNetwork } from '../utils';

export class UsdtPAYGReadContractManager {
  protected readonly usdtTokenReadContract: Contract;

  protected readonly payAsYouGoReadContract: Contract;

  constructor(
    protected readonly keyReadProvider: Web3KeyReadProvider,
    protected readonly tokenAddress: Web3Address,
    protected readonly depositContractAddress: Web3Address,
  ) {
    this.usdtTokenReadContract = keyReadProvider.createContract(
      ABI_USDT_TOKEN,
      tokenAddress,
    );

    this.payAsYouGoReadContract = keyReadProvider.createContract(
      ABI_PAY_AS_YOU_GO_COMMON,
      depositContractAddress,
    );
  }

  public async getLatestAllowanceEvents(
    user: Web3Address,
  ): Promise<EventData[]> {
    const events = await this.usdtTokenReadContract.getPastEvents('Approval', {
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

  protected async getAccountBalance(
    accountAddress: Web3Address,
    network: EBlockchain,
    tokenAddress: Web3Address,
  ) {
    const provider =
      await (new ProviderManager().getETHReadProvider(getReadProviderByNetwork(network)));

    const contract = provider.createContract(
      ABI_USDT_TOKEN,
      tokenAddress,
    );

    const balance = await (contract.methods as IUsdtToken)
      .balanceOf(accountAddress)
      .call();

    return balance;
  }
}
