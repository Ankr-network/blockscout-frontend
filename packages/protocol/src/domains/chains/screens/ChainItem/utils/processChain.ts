import { IApiChain } from 'domains/chains/api/queryChains';

export const processChain = (chain: IApiChain): IApiChain => ({
  ...chain,
  ...chain.frontChain,
  id: chain.id,
});
