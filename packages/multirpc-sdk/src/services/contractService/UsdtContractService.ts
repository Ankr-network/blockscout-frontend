import { IWeb3SendResult, Web3KeyWriteProvider } from '@ankr.com/provider';
import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';
import { EventData } from 'web3-eth-contract';

import { PrefixedHex, Web3Address } from '../../common';
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

  // eslint-disable-next-line max-params
  async depositUSDTToPAYG(
    amount: BigNumber,
    tokenDecimals: number,
    tokenAddress: Web3Address,
    depositContractAddress: Web3Address,
  ): Promise<IWeb3SendResult> {
    const formattedAmount = new BigNumber(convertNumberWithDecimalsToString(amount, tokenDecimals));

    return this.usdtPAYGContractManager.depositUSDT(
      formattedAmount,
      tokenAddress,
      tokenDecimals,
      depositContractAddress,
    );
  }

  async getDepositUSDTToPAYGFee(
    amount: BigNumber,
    depositContractAddress: Web3Address,
  ) {
    return this.usdtPAYGContractManager.getDepositUsdtFee(
      amount,
      depositContractAddress,
    );
  }
  // eslint-disable-next-line max-params
  public async depositUSDTToPAYGForUser(
    amount: BigNumber,
    tokenDecimals: number,
    targetAddress: Web3Address,
    tokenAddress: Web3Address,
    depositContractAddress: Web3Address,
  ): Promise<IWeb3SendResult> {
    const formattedAmount = new BigNumber(convertNumberWithDecimalsToString(amount, tokenDecimals));

    return this.usdtPAYGContractManager.depositUsdtForUser({
      tokenDecimals,
      depositValue: formattedAmount,
      targetAddress,
      tokenAddress,
      depositContractAddress,
    });
  }

  // eslint-disable-next-line max-params
  async setAllowanceForPAYG(
    amount: BigNumber,
    depositContractAddress: Web3Address,
    tokenAddress: Web3Address,
    tokenDecimals: number,
  ): Promise<IWeb3SendResult> {
    return this.usdtPAYGContractManager.setAllowance(
      amount,
      depositContractAddress,
      tokenAddress,
      tokenDecimals,
    );
  }

  async getAllowanceFee(
    amount: BigNumber,
    depositContractAddress: Web3Address,
  ) {
    return this.usdtPAYGContractManager.getAllowanceFee(
      amount,
      depositContractAddress,
    );
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

  async getAllowanceValue(
    depositContractAddress: Web3Address,
  ): Promise<BigNumber> {
    return this.usdtPAYGContractManager.getAllowanceValue(
      depositContractAddress,
    );
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

  public getCurrentAccountBalance() {
    return this.usdtPAYGContractManager.getCurrentAccountBalance();
  }
}
