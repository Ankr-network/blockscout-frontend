import { ChainID } from '@ankr.com/chains-list';

import { chainGroups } from 'modules/endpoints/constants/groups';
import { isGroupEvmBased } from 'modules/endpoints/utils/isGroupEvmBased';

import { isBeacon, isOpnode } from '../../../domains/chains/utils/isBeacon';

export const isEVMBased = (chainID: ChainID) =>
  chainGroups
    .filter(isGroupEvmBased)
    .some(({ chains }) => chains.includes(chainID)) &&
  !isBeacon(chainID) && // all beacons are non evm
  !isOpnode(chainID); // all opnodes are non evm
