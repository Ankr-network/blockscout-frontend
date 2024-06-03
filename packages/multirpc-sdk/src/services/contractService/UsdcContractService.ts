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

  async depositUSDCToPAYG({
    amount,
    tokenDecimals,
    tokenAddress,
    network,
    depositContractAddress,
  }: IDepositStablecoinToPAYGParams): Promise<IWeb3SendResult> {
    const formattedAmount = new BigNumber(
      convertNumberWithDecimalsToString(amount, tokenDecimals),
    );

    return this.usdcPAYGContractManager.depositUSDC({
      amount: formattedAmount,
      network,
      tokenAddress,
      tokenDecimals,
      depositContractAddress,
    });
  }

  async getDepositUSDCToPAYGFee({
    network,
    tokenAddress,
    amount,
    depositContractAddress,
    tokenDecimals,
  }: IGetDepositStablecoinToPAYGFeeParams) {
    return this.usdcPAYGContractManager.getDepositUsdcFee({
      network,
      tokenAddress,
      amount,
      depositContractAddress,
      tokenDecimals,
    });
  }

  public async depositUSDCToPAYGForUser({
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

    return this.usdcPAYGContractManager.depositUsdcForUser({
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
    return this.usdcPAYGContractManager.setAllowance(params);
  }

  async getAllowanceFee({
    network,
    tokenAddress,
    amount,
    depositContractAddress,
    tokenDecimals,
  }: IGetAllowanceFeeParams) {
    return this.usdcPAYGContractManager.getAllowanceFee({
      network,
      tokenAddress,
      amount,
      depositContractAddress,
      tokenDecimals,
    });
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

  async getAllowanceValue({
    network,
    depositContractAddress,
    tokenAddress,
  }: IGetAllowanceValueParams): Promise<BigNumber> {
    return this.usdcPAYGContractManager.getAllowanceValue({
      network,
      depositContractAddress,
      tokenAddress,
    });
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

  public getCurrentAccountBalance(
    network: EBlockchain,
    tokenAddress: Web3Address,
  ) {
    return this.usdcPAYGContractManager.getCurrentAccountBalance(
      network,
      tokenAddress
    );
  }
}
