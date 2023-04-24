import { chainGroups } from 'modules/endpoints/constants/groups';
import { evmGroups } from 'modules/endpoints/constants/evmGroups';
import { ChainID } from '../types';

export const isEVMBased = (chainID: ChainID) =>
  chainGroups
    .filter(({ id }) => evmGroups.includes(id))
    .some(({ chains }) => chains.includes(chainID));
