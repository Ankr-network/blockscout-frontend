import { GroupedEndpoints } from 'modules/endpoints/types';
import { IApiChainURL } from 'domains/chains/api/queryChains';
import { evmGroups } from 'modules/endpoints/constants/evmGroups';

export const getEvmEndpoint = ({
  mainnet,
}: GroupedEndpoints): IApiChainURL | undefined =>
  mainnet.filter(({ id }) => evmGroups.includes(id))?.[0]?.urls?.[0];
