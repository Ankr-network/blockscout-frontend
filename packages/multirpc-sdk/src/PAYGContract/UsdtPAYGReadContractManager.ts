import { Contract, EventData } from 'web3-eth-contract';
import { ProviderManager, Web3KeyReadProvider } from '@ankr.com/provider';

import ABI_USDT_TOKEN from './abi/UsdtToken.json';
import {
  EBlockchain,
  IEstimateStablecoinFeeParams,
  IGetStablecoinAllowanceParams,
  Web3Address,
} from '../common';
import { GAS_LIMIT, ZERO_STRING } from './const';
import { IUsdtToken } from './abi/IUsdtToken';
import {
  convertNumberWithDecimalsToString,
  getReadProviderByNetwork,
} from '../utils';

export class UsdtPAYGReadContractManager {
  protected readonly usdtTokenContract: Contract;

  constructor(
    protected readonly keyReadProvider: Web3KeyReadProvider,
    protected readonly tokenAddress: Web3Address,
  ) {
    this.usdtTokenContract = keyReadProvider.createContract(
      ABI_USDT_TOKEN,
      tokenAddress,
    );
  }

  async getLatestAllowanceEvents(user: Web3Address): Promise<EventData[]> {
    const events = await this.usdtTokenContract.getPastEvents('Approval', {
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

  async getAccountBalance(accountAddress: Web3Address, network: EBlockchain) {
    const provider = await this.getProviderByNetwork(network);

    const contract = provider.createContract(ABI_USDT_TOKEN, this.tokenAddress);

    const balance = await (contract.methods as IUsdtToken)
      .balanceOf(accountAddress)
      .call();

    return balance;
  }

  async getAllowance({ from, network, to }: IGetStablecoinAllowanceParams) {
    const provider = await this.getProviderByNetwork(network);

    const contract = provider.createContract(ABI_USDT_TOKEN, this.tokenAddress);

    const allowance = await (contract.methods as IUsdtToken)
      .allowance(from, to)
      .call();

    return allowance;
  }

  async estimateAllowanceFee({
    amount,
    to,
    from,
    network,
    tokenDecimals: decimals,
  }: IEstimateStablecoinFeeParams) {
    const provider = await this.getProviderByNetwork(network);

    const contract = provider.createContract(ABI_USDT_TOKEN, this.tokenAddress);

    const amountString = convertNumberWithDecimalsToString(amount, decimals);
    const gas = Number(GAS_LIMIT);

    let gasAmount = 0;

    // we add here this structure to avoid an error
    // when requesting gas fee for approve tx
    // if user already have any approved amount
    // p.s. this is the specifics of USDT smart contract
    try {
      gasAmount = await (contract.methods as IUsdtToken)
        .approve(to, amountString)
        .estimateGas({ from, gas });
    } catch {
      gasAmount = await (contract.methods as IUsdtToken)
        .approve(to, ZERO_STRING)
        .estimateGas({ from, gas });
    }

    return this.keyReadProvider.getContractMethodFee(gasAmount);
  }

  async estimateDepositFee({
    amount,
    to,
    from,
    network,
    tokenDecimals: decimals,
  }: IEstimateStablecoinFeeParams) {
    const provider = await this.getProviderByNetwork(network);
    const contract = provider.createContract(ABI_USDT_TOKEN, this.tokenAddress);

    const gas = Number(GAS_LIMIT);
    const amountString = convertNumberWithDecimalsToString(amount, decimals);

    let gasAmount = 0;

    // we add here this structure to avoid an error
    // when requesting gas fee for deposit tx
    // if user don't have enough allowance or tokens
    // p.s. this is the specifics of USDT smart contract
    try {
      gasAmount = await (contract.methods as IUsdtToken)
        .transfer(to, amountString)
        .estimateGas({ from, gas });
    } catch {
      gasAmount = await (contract.methods as IUsdtToken)
        .transfer(to, ZERO_STRING)
        .estimateGas({ from, gas });
    }

    const gasPrice = await provider.getSafeGasPriceWei();

    const feeWei = gasPrice.multipliedBy(gasAmount);

    return this.keyReadProvider.getWeb3().utils.fromWei(feeWei.toString());
  }

  private async getProviderByNetwork(network: EBlockchain) {
    const providerManager = new ProviderManager();
    const providerId = getReadProviderByNetwork(network);
    const provider = await providerManager.getETHReadProvider(providerId);

    return provider;
  }
}
