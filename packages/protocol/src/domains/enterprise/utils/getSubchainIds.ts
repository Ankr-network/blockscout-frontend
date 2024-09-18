import { Chain } from '@ankr.com/chains-list';

export const getSubchainIds = (chain: Chain): string[] => [
  chain.id,
  ...(chain.extensions?.flatMap(getSubchainIds) || []),
  ...(chain.extenders?.flatMap(getSubchainIds) || []),
  ...(chain.testnets?.flatMap(getSubchainIds) || []),
  ...(chain.devnets?.flatMap(getSubchainIds) || []),
];
