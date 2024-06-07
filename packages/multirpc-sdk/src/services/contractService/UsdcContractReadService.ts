import { EBlockchain, IEstimateStablecoinFeeParams } from '../../common';
import { UsdcPAYGReadContractManager } from '../../PAYGContract/UsdcPAYGReadContractManager';

export class UsdcContractReadService {
  constructor(
    protected readonly usdcPAYGContractManager: UsdcPAYGReadContractManager,
  ) {}

  async getBalance(
    accountAddress: string,
    network: EBlockchain,
  ) {
    return this.usdcPAYGContractManager.getAccountBalance(
      accountAddress,
      network,
    );
  }

  async estimateAllowanceFee(params: IEstimateStablecoinFeeParams) {
    return this.usdcPAYGContractManager.estimateAllowanceFee(params);
  }

  async estimateDepositFee(params: IEstimateStablecoinFeeParams) {
    return this.usdcPAYGContractManager.estimateDepositFee(params);
  }
}
