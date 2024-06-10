import BigNumber from 'bignumber.js';
import { Web3KeyWriteProvider } from '@ankr.com/provider';

import {
  EBlockchain,
  IDepositStablecoinToPAYGForUserParams,
  IDepositStablecoinToPAYGParams,
  IGetAllowanceFeeParams,
  IGetAllowanceValueParams,
  IGetDepositStablecoinToPAYGFeeParams,
  ISetAllowanceParams,
  PrefixedHex,
  Web3Address,
} from '../../common';
import { UsdcPAYGContractManager } from '../../PAYGContract/UsdcPAYGContractManager';
import { convertNumberWithDecimalsToString } from '../../utils';

export class USDCContractService {
  constructor(
    private readonly keyProvider: Web3KeyWriteProvider,
    protected readonly usdcPAYGContractManager: UsdcPAYGContractManager,
  ) {}

  depositUSDCToPAYG({
    amount,
    tokenDecimals,
    tokenAddress,
    network,
    depositContractAddress,
  }: IDepositStablecoinToPAYGParams) {
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

  getDepositUSDCToPAYGFee({
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

  depositUSDCToPAYGForUser({
    amount,
    tokenDecimals,
    targetAddress,
    tokenAddress,
    network,
    depositContractAddress,
  }: IDepositStablecoinToPAYGForUserParams) {
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

  setAllowanceForPAYG(params: ISetAllowanceParams) {
    return this.usdcPAYGContractManager.setAllowance(params);
  }

  getAllowanceFee({
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

  getTransactionReceipt(txHash: PrefixedHex) {
    return this.keyProvider.getWeb3().eth.getTransactionReceipt(txHash);
  }

  getAllowanceValue({
    network,
    depositContractAddress,
    tokenAddress,
  }: IGetAllowanceValueParams) {
    return this.usdcPAYGContractManager.getAllowanceValue({
      network,
      depositContractAddress,
      tokenAddress,
    });
  }

  async getLatestAllowanceEvent(user: Web3Address) {
    const events = await this.usdcPAYGContractManager
      .getLatestAllowanceEvents(user);

    if (!events?.length) return undefined;

    return events[events.length - 1];
  }

  getCurrentAccountBalance(network: EBlockchain) {
    return this.usdcPAYGContractManager.getCurrentAccountBalance(network);
  }
}
