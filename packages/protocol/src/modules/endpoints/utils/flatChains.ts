import { Chain } from 'domains/chains/types';

export const flatChains = ({
  extenders = [],
  extensions = [],
  ...chain
}: Chain): Chain[] => [
  chain,
  ...extenders.flatMap(flatChains),
  ...extensions.flatMap(flatChains),
];
