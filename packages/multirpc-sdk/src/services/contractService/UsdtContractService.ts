import { IWeb3SendResult, Web3KeyWriteProvider } from '@ankr.com/provider';
import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';
import { EventData } from 'web3-eth-contract';

import {
  EBlockchain,
  IDepositStablecoinToPAYGParams,
  IDepositStablecoinToPAYGForUserParams,
  IGetAllowanceFeeParams,
  IGetDepositStablecoinToPAYGFeeParams,
  ISetAllowanceParams,
  PrefixedHex,
  Web3Address,
  IGetAllowanceValueParams
} from '../../common';
import { UsdtPAYGContractManager } from '../../PAYGContract/UsdtPAYGContractManager';
import { UsdtContractReadService } from './UsdtContractReadService';
import { convertNumberWithDecimalsToString } from '../../utils';

export class USDTContractService extends UsdtContractReadService {
  public constructor(
    private readonly keyProvider: Web3KeyWriteProvider,
    protected readonly usdtPAYGContractManager: UsdtPAYGContractManager,
  ) {
    super(usdtPAYGContractManager);
  }

  async depositUSDTToPAYG({
    amount,
    tokenDecimals,
    tokenAddress,
    network,
    depositContractAddress,
  }: IDepositStablecoinToPAYGParams): Promise<IWeb3SendResult> {
    const formattedAmount = new BigNumber(
      convertNumberWithDecimalsToString(amount, tokenDecimals),
    );

    return this.usdtPAYGContractManager.depositUSDT({
      amount: formattedAmount,
      network,
      tokenAddress,
      tokenDecimals,
      depositContractAddress,
    });
  }

  async getDepositUSDTToPAYGFee({
    network,
    tokenAddress,
    tokenDecimals,
    amount,
    depositContractAddress,
  }: IGetDepositStablecoinToPAYGFeeParams) {
    return this.usdtPAYGContractManager.getDepositUsdtFee({
      network,
      tokenAddress,
      tokenDecimals,
      amount,
      depositContractAddress,
    });
  }

  public async depositUSDTToPAYGForUser({
    amount,
    tokenDecimals,
    targetAddress,
    tokenAddress,
    network,
    depositContractAddress,
  }: IDepositStablecoinToPAYGForUserParams): Promise<IWeb3SendResult> {
    const formattedAmount = new BigNumber(
      convertNumberWithDecimalsToString(amount, tokenDecimals),
    );

    return this.usdtPAYGContractManager.depositUsdtForUser({
      tokenDecimals,
      depositValue: formattedAmount,
      targetAddress,
      tokenAddress,
      network,
      depositContractAddress,
    });
  }

  async setAllowanceForPAYG(
    params: ISetAllowanceParams,
  ): Promise<IWeb3SendResult> {
    return this.usdtPAYGContractManager.setAllowance(params);
  }

  async getAllowanceFee({
    network,
    tokenAddress,
    amount,
    depositContractAddress,
    tokenDecimals,
  }: IGetAllowanceFeeParams) {
    return this.usdtPAYGContractManager.getAllowanceFee({
      network,
      tokenAddress,
      amount,
      depositContractAddress,
      tokenDecimals,
    });
  }

  // public async rejectAllowanceForPAYG(): Promise<IWeb3SendResult> {
  //   // Replace with USDT-specific reject allowance method
  // }

  async getTransactionReceipt(
    transactionHash: PrefixedHex,
  ): Promise<TransactionReceipt> {
    const transactionReceipt = await this.keyProvider
      .getWeb3()
      .eth.getTransactionReceipt(transactionHash);

    return transactionReceipt;
  }

  async getAllowanceValue({
    network,
    depositContractAddress,
    tokenAddress,
  }: IGetAllowanceValueParams): Promise<BigNumber> {
    return this.usdtPAYGContractManager.getAllowanceValue({
      network,
      depositContractAddress,
      tokenAddress,
    });
  }

  async getLatestAllowanceEvent(
    user: Web3Address,
  ): Promise<EventData | undefined> {
    const events = await this.usdtPAYGContractManager.getLatestAllowanceEvents(
      user,
    );

    if (!events?.length) return undefined;

    return events[events.length - 1];
  }

  // async canIssueJwtToken(
  //   transactionHash: PrefixedHex,
  // ): Promise<IIssueJwtTokenResult> {
  //   // Replace with USDT-specific can issue JWT token method
  // }

  public getCurrentAccountBalance(network: EBlockchain) {
    return this.usdtPAYGContractManager.getCurrentAccountBalance(network);
  }
}
