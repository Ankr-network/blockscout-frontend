import { ChainID } from '../types';
import { chainGroups } from 'modules/endpoints/constants/groups';
import { evmGroups } from 'modules/endpoints/constants/evmGroups';

export const isEVMBased = (chainID: ChainID) =>
  chainGroups
    .filter(({ id }) => evmGroups.includes(id))
    .some(({ chains }) => chains.includes(chainID));
