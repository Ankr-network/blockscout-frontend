import { EventData } from 'web3-eth-contract';

import { UsdtPAYGContractManager } from '../../PAYGContract/UsdtPAYGContractManager';
import { UsdtPAYGReadContractManager } from '../../PAYGContract/UsdtPAYGReadContractManager';

export type { EventData };

export class UsdtContractReadService {
  public constructor(
    protected readonly usdtPAYGContractManager:
      | UsdtPAYGContractManager
      | UsdtPAYGReadContractManager,
  ) { }
}
