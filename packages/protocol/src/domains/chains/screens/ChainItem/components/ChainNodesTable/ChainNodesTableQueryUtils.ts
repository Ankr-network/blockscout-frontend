import { IApiChain } from 'domains/chains/api/queryChains';
import { CHAIN_ID_LINK_MAP } from './const';

export const getLinkedChainIDs = (
  chainIDs: IApiChain['id'][],
): IApiChain['id'][] => [
  ...new Set(chainIDs.map(id => CHAIN_ID_LINK_MAP[id] ?? id)),
];
