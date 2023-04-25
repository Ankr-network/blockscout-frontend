import { Chain } from 'domains/chains/types';

export interface ChainNameParams {
  chainId: string;
  privateChain?: Chain;
  publicChain?: Chain;
}

export const getChainName = ({
  chainId,
  privateChain,
  publicChain,
}: ChainNameParams) => {
  const { name, chainWithoutMainnet: { name: frontChainName = '' } = {} } =
    privateChain || publicChain || {};

  return frontChainName || name || chainId;
};
