import {
  EBlockchain,
  IEstimateStablecoinFeeParams,
  IGetStablecoinAllowanceParams,
  Web3Address,
} from '../../common';
import { UsdtPAYGReadContractManager } from '../../PAYGContract/UsdtPAYGReadContractManager';

export class UsdtContractReadService {
  constructor(
    protected readonly usdtPAYGContractManager: UsdtPAYGReadContractManager,
  ) {}

  getBalance(accountAddress: Web3Address, network: EBlockchain) {
    return this.usdtPAYGContractManager.getAccountBalance(
      accountAddress,
      network,
    );
  }

  getAllowance(params: IGetStablecoinAllowanceParams) {
    return this.usdtPAYGContractManager.getAllowance(params);
  }

  estimateAllowanceFee(params: IEstimateStablecoinFeeParams) {
    return this.usdtPAYGContractManager.estimateAllowanceFee(params);
  }

  estimateDepositFee(params: IEstimateStablecoinFeeParams) {
    return this.usdtPAYGContractManager.estimateDepositFee(params);
  }
}
