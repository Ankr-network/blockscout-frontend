import { ChainGroupID, ChainID } from '../types';
import { getGroupById } from './getGroupById';

const { C_CHAIN, FALLBACK, NERVOS_CKB, NERVOS_GW, P_CHAIN, X_CHAIN } =
  ChainGroupID;

const exceptions = [C_CHAIN, NERVOS_CKB, NERVOS_GW, P_CHAIN, X_CHAIN];

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
