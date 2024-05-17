import { Contract, EventData } from 'web3-eth-contract';
import { ProviderManager, Web3KeyReadProvider } from '@ankr.com/provider';

import { EBlockchain, Web3Address } from '../common';
import ABI_USDC_TOKEN from './abi/UsdcToken.json';
import ABI_PAY_AS_YOU_GO_COMMON from './abi/PayAsYouGoCommon.json';
import { IUsdcToken } from './abi/IUsdcToken';
import { getReadProviderByNetwork } from '../utils';

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

  protected async getAccountBalance(
    accountAddress: Web3Address,
    network: EBlockchain,
    tokenAddress: Web3Address,
  ) {
    const provider =
      await (new ProviderManager().getETHReadProvider(getReadProviderByNetwork(network)));

    const contract = provider.createContract(
      ABI_USDC_TOKEN,
      tokenAddress,
    );

    const balance = await (contract.methods as IUsdcToken)
      .balanceOf(accountAddress)
      .call();

    return balance;
  }
}
