import { Chain } from '@ankr.com/chains-list';

export const flatChains = ({
  extenders = [],
  extensions = [],
  ...chain
}: Chain): Chain[] => [
  chain,
  ...extenders.flatMap(flatChains),
  ...extensions.flatMap(flatChains),
];
