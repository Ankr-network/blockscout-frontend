import { Contract, EventData } from 'web3-eth-contract';
import { ProviderManager, Web3KeyReadProvider } from '@ankr.com/provider';

import ABI_USDC_TOKEN from './abi/UsdcToken.json';
import {
  EBlockchain,
  IEstimateStablecoinFeeParams,
  IGetStablecoinAllowanceParams,
  Web3Address,
} from '../common';
import { GAS_LIMIT, ZERO_STRING } from './const';
import { IUsdcToken } from './abi/IUsdcToken';
import {
  convertNumberWithDecimalsToString,
  getReadProviderByNetwork,
} from '../utils';

export class UsdcPAYGReadContractManager {
  protected readonly usdcTokenContract: Contract;

  constructor(
    protected readonly keyReadProvider: Web3KeyReadProvider,
    protected readonly tokenAddress: Web3Address,
  ) {
    this.usdcTokenContract = keyReadProvider.createContract(
      ABI_USDC_TOKEN,
      tokenAddress,
    );
  }

  async getLatestAllowanceEvents(user: Web3Address): Promise<EventData[]> {
    const events = await this.usdcTokenContract.getPastEvents('Approval', {
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

  async getAccountBalance(
    accountAddress: Web3Address,
    network: EBlockchain,
  ) {
    const provider = await this.getProviderByNetwork(network);

    const contract = provider.createContract(ABI_USDC_TOKEN, this.tokenAddress);

    const balance = await (contract.methods as IUsdcToken)
      .balanceOf(accountAddress)
      .call();

    return balance;
  }

  async getAllowance({
    to,
    from,
    network,
  }: IGetStablecoinAllowanceParams) {
    const provider = await this.getProviderByNetwork(network);

    const contract = provider.createContract(ABI_USDC_TOKEN, this.tokenAddress);

    const allowance = await (contract.methods as IUsdcToken)
      .allowance(from, to)
      .call();

    return allowance;
  }

  async estimateAllowanceFee({
    amount,
    from,
    network,
    to,
    tokenDecimals: decimals,
  }: IEstimateStablecoinFeeParams) {
    const provider = await this.getProviderByNetwork(network);

    const contract = provider.createContract(ABI_USDC_TOKEN, this.tokenAddress);

    const amountString = convertNumberWithDecimalsToString(amount, decimals);
    const gas = Number(GAS_LIMIT);

    let gasAmount = 0;

    // we add here this structure to avoid an error
    // when requesting gas fee for approve tx
    // if don't have enough money
    // p.s. this is the specifics of USDC smart contract 
    // on arbitrum (and probably another chains)
    try {
      gasAmount = await (contract.methods as IUsdcToken)
        .approve(to, amountString)
        .estimateGas({ from, gas });
    } catch {
      gasAmount = await (contract.methods as IUsdcToken)
        .approve(to, ZERO_STRING)
        .estimateGas({ from, gas });
    }

    return provider.getContractMethodFee(gasAmount);
  }

  async estimateDepositFee({
    amount,
    from,
    network,
    to,
    tokenDecimals: decimals,
  }: IEstimateStablecoinFeeParams) {
    const provider = await this.getProviderByNetwork(network);

    const contract = provider.createContract(ABI_USDC_TOKEN, this.tokenAddress);

    const amountString = convertNumberWithDecimalsToString(amount, decimals);
    const gas = Number(GAS_LIMIT);

    let gasAmount = 0;

    // we add here this structure to avoid an error
    // when requesting gas fee for approve tx
    // if don't have enough money
    // p.s. this is the specifics of USDC smart contract 
    // on arbitrum (and probably another chains)
    try {
      gasAmount = await (contract.methods as IUsdcToken)
        .transfer(to, amountString)
        .estimateGas({ from, gas });
    } catch (e) {
      gasAmount = await (contract.methods as IUsdcToken)
        .transfer(to, ZERO_STRING)
        .estimateGas({ from, gas });
    }

    const gasPrice = await provider.getSafeGasPriceWei();

    const feeWei = gasPrice.multipliedBy(gasAmount);

    return provider.getWeb3().utils.fromWei(feeWei.toString());
  }

  private async getProviderByNetwork(network: EBlockchain) {
    const providerManager = new ProviderManager();
    const providerId = getReadProviderByNetwork(network);
    const provider = await providerManager.getETHReadProvider(providerId);

    return provider;
  }
}
