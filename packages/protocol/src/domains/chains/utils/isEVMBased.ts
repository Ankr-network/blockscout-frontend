import { chainGroups } from 'modules/endpoints/constants/groups';
import { evmGroups } from 'modules/endpoints/constants/evmGroups';

import { ChainID } from '../types';
import { isBeacon, isOpnode } from './isBeacon';

export const isEVMBased = (chainID: ChainID) =>
  chainGroups
    .filter(({ id }) => evmGroups.includes(id))
    .some(({ chains }) => chains.includes(chainID)) &&
  !isBeacon(chainID) && // all beacons are non evm
  !isOpnode(chainID); // all opnodes are non evm
