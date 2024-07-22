import { chainGroups } from 'modules/endpoints/constants/groups';
import { ChainID } from 'modules/chains/types';
import { isGroupEvmBased } from 'modules/endpoints/utils/isGroupEvmBased';

import { isBeacon, isOpnode } from './isBeacon';

export const isEVMBased = (chainID: ChainID) =>
  chainGroups
    .filter(isGroupEvmBased)
    .some(({ chains }) => chains.includes(chainID)) &&
  !isBeacon(chainID) && // all beacons are non evm
  !isOpnode(chainID); // all opnodes are non evm
