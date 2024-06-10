import BigNumber from 'bignumber.js';
import { Web3KeyWriteProvider } from '@ankr.com/provider';

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
  constructor(
    private readonly keyProvider: Web3KeyWriteProvider,
    protected readonly usdtPAYGContractManager: UsdtPAYGContractManager,
  ) {
    super(usdtPAYGContractManager);
  }

  depositUSDTToPAYG({
    amount,
    tokenDecimals,
    tokenAddress,
    network,
    depositContractAddress,
  }: IDepositStablecoinToPAYGParams) {
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

  getDepositUSDTToPAYGFee({
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

  depositUSDTToPAYGForUser({
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

    return this.usdtPAYGContractManager.depositUsdtForUser({
      tokenDecimals,
      depositValue: formattedAmount,
      targetAddress,
      tokenAddress,
      network,
      depositContractAddress,
    });
  }

  setAllowanceForPAYG(params: ISetAllowanceParams) {
    return this.usdtPAYGContractManager.setAllowance(params);
  }

  getAllowanceFee({
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

  getTransactionReceipt(txHash: PrefixedHex) {
    return this.keyProvider.getWeb3().eth.getTransactionReceipt(txHash);;
  }

  getAllowanceValue({
    network,
    depositContractAddress,
    tokenAddress,
  }: IGetAllowanceValueParams) {
    return this.usdtPAYGContractManager.getAllowanceValue({
      network,
      depositContractAddress,
      tokenAddress,
    });
  }

  async getLatestAllowanceEvent(user: Web3Address) {
    const events = await this.usdtPAYGContractManager
      .getLatestAllowanceEvents(user);

    if (!events?.length) return undefined;

    return events[events.length - 1];
  }

  getCurrentAccountBalance(network: EBlockchain) {
    return this.usdtPAYGContractManager.getCurrentAccountBalance(network);
  }
}
