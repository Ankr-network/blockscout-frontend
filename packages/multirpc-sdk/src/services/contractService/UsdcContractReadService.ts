import { EventData } from 'web3-eth-contract';

import { UsdcPAYGContractManager } from '../../PAYGContract/UsdcPAYGContractManager';
import { UsdcPAYGReadContractManager } from '../../PAYGContract/UsdcPAYGReadContractManager';

export type { EventData };

export class UsdcContractReadService {
  public constructor(
    protected readonly usdcPAYGContractManager:
      | UsdcPAYGContractManager
      | UsdcPAYGReadContractManager,
  ) { }
}
