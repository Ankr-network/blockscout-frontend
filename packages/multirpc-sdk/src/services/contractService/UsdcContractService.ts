import { IWeb3SendResult, Web3KeyWriteProvider } from '@ankr.com/provider';
import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';
import { EventData } from 'web3-eth-contract';

import { PrefixedHex, Web3Address } from '../../common';
import { UsdcPAYGContractManager } from '../../PAYGContract/UsdcPAYGContractManager';
import { UsdcContractReadService } from './UsdcContractReadService';
import { convertNumberWithDecimalsToString } from '../../utils';

export class USDCContractService extends UsdcContractReadService {
  public constructor(
    private readonly keyProvider: Web3KeyWriteProvider,
    protected readonly usdcPAYGContractManager: UsdcPAYGContractManager,
  ) {
    super(usdcPAYGContractManager);
  }

  // eslint-disable-next-line max-params
  async depositUSDCToPAYG(
    amount: BigNumber,
    tokenDecimals: number,
    tokenAddress: Web3Address,
    depositContractAddress: Web3Address,
  ): Promise<IWeb3SendResult> {
    const formattedAmount = new BigNumber(convertNumberWithDecimalsToString(amount, tokenDecimals));

    return this.usdcPAYGContractManager.depositUSDC(
      formattedAmount,
      tokenAddress,
      tokenDecimals,
      depositContractAddress,
    );
  }

  async getDepositUSDCToPAYGFee(
    amount: BigNumber,
    depositContractAddress: Web3Address,
  ) {
    return this.usdcPAYGContractManager.getDepositUsdcFee(
      amount,
      depositContractAddress,
    );
  }

  // eslint-disable-next-line max-params
  public async depositUSDCToPAYGForUser(
    amount: BigNumber,
    tokenDecimals: number,
    targetAddress: Web3Address,
    tokenAddress: Web3Address,
    depositContractAddress: Web3Address,
  ): Promise<IWeb3SendResult> {
    const formattedAmount = new BigNumber(convertNumberWithDecimalsToString(amount, tokenDecimals));

    return this.usdcPAYGContractManager.depositUsdcForUser({
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
    return this.usdcPAYGContractManager.setAllowance(
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
    return this.usdcPAYGContractManager.getAllowanceFee(
      amount,
      depositContractAddress,
    );
  }

  // public async rejectAllowanceForPAYG(): Promise<IWeb3SendResult> {
  //   // Replace with USDC-specific reject allowance method
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
    return this.usdcPAYGContractManager.getAllowanceValue(
      depositContractAddress,
    );
  }

  async getLatestAllowanceEvent(
    user: Web3Address,
  ): Promise<EventData | undefined> {
    const events = await this.usdcPAYGContractManager.getLatestAllowanceEvents(
      user,
    );

    if (!events?.length) return undefined;

    return events[events.length - 1];
  }

  // async canIssueJwtToken(
  //   transactionHash: PrefixedHex,
  // ): Promise<IIssueJwtTokenResult> {
  //   // Replace with USDC-specific can issue JWT token method
  // }

  public getCurrentAccountBalance() {
    return this.usdcPAYGContractManager.getCurrentAccountBalance();
  }
}
