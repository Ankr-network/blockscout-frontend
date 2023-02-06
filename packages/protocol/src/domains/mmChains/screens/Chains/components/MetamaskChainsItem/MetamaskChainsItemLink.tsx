import { RPCInfoFun } from 'uiKit/RPCInfoFunc/RPCInfoFunc';
import { IApiChainURL } from 'domains/chains/api/queryChains';
import { Chain } from 'domains/chains/types';

interface MetamaskChainsItemLinkProps {
  publicChain?: Chain;
  urls: IApiChainURL[];
}

export const MetamaskChainsItemLink = ({
  publicChain,
  urls,
}: MetamaskChainsItemLinkProps) => {
  return (
    <>
      {urls.length <= 1
        ? publicChain &&
          urls.map(({ rpc }) => (
            <RPCInfoFun key={rpc} info={rpc} publicChain={publicChain} />
          ))
        : publicChain && (
            <RPCInfoFun info={urls[0].rpc} publicChain={publicChain} />
          )}
    </>
  );
};
