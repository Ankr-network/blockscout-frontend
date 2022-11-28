import { IApiChain } from 'domains/chains/api/queryChains';

export interface ChainNameParams {
  chainId: string;
  privateChain?: IApiChain;
  publicChain?: IApiChain;
}

export const getChainName = ({
  chainId,
  privateChain,
  publicChain,
}: ChainNameParams) => {
  const { name, frontChain: { name: frontChainName = '' } = {} } =
    privateChain || publicChain || {};

  return frontChainName || name || chainId;
};
