import { ChainID } from 'modules/chains/types';

import { ChainGroupID } from '../types';
import { getGroupById } from './getGroupById';

const { C_CHAIN, FALLBACK, JSON_RPC, NERVOS_CKB, NERVOS_GW, P_CHAIN, X_CHAIN } =
  ChainGroupID;

const exceptions = [C_CHAIN, JSON_RPC, NERVOS_CKB, NERVOS_GW, P_CHAIN, X_CHAIN];

export const filterChainIdsByGroup = (
  chainIds: ChainID[],
  groupId: ChainGroupID,
  withExceptions?: boolean,
) => {
  const group = getGroupById(groupId);

  const withoutProcessing =
    groupId === FALLBACK || (withExceptions && exceptions.includes(groupId));

  return withoutProcessing
    ? chainIds
    : chainIds.filter(id => group?.chains.includes(id));
};
