import {
  EBlockchain,
  IEstimateStablecoinFeeParams,
  IGetStablecoinAllowanceParams,
  Web3Address,
} from '../../common';
import { UsdcPAYGReadContractManager } from '../../PAYGContract/UsdcPAYGReadContractManager';

export class UsdcContractReadService {
  constructor(
    protected readonly usdcPAYGContractManager: UsdcPAYGReadContractManager,
  ) {}

  getBalance(accountAddress: Web3Address, network: EBlockchain) {
    return this.usdcPAYGContractManager.getAccountBalance(
      accountAddress,
      network,
    );
  }

  getAllowance(params: IGetStablecoinAllowanceParams) {
    return this.usdcPAYGContractManager.getAllowance(params);
  }

  estimateAllowanceFee(params: IEstimateStablecoinFeeParams) {
    return this.usdcPAYGContractManager.estimateAllowanceFee(params);
  }

  estimateDepositFee(params: IEstimateStablecoinFeeParams) {
    return this.usdcPAYGContractManager.estimateDepositFee(params);
  }
}
