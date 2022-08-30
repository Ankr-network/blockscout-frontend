import { IApiChain } from 'domains/chains/api/queryChains';

export const flatChains = ({
  extenders = [],
  extensions = [],
  ...chain
}: IApiChain): IApiChain[] => [
  chain,
  ...extenders.flatMap(flatChains),
  ...extensions.flatMap(flatChains),
];
