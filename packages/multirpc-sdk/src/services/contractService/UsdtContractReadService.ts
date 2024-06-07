import { EBlockchain, IEstimateStablecoinFeeParams } from '../../common';
import { UsdtPAYGReadContractManager } from '../../PAYGContract/UsdtPAYGReadContractManager';

export class UsdtContractReadService {
  constructor(
    protected readonly usdtPAYGContractManager: UsdtPAYGReadContractManager,
  ) {}

  async getBalance(accountAddress: string, network: EBlockchain) {
    return this.usdtPAYGContractManager.getAccountBalance(
      accountAddress,
      network,
    );
  }

  async estimateAllowanceFee(params: IEstimateStablecoinFeeParams) {
    return this.usdtPAYGContractManager.estimateAllowanceFee(params);
  }

  async estimateDepositFee(params: IEstimateStablecoinFeeParams) {
    return this.usdtPAYGContractManager.estimateDepositFee(params);
  }
}
