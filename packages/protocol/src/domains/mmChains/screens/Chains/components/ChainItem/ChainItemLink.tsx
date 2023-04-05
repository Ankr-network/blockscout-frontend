import { RPCInfoFun } from 'uiKit/RPCInfoFunc/RPCInfoFunc';
import { IApiChainURL } from 'domains/chains/api/queryChains';
import { Chain } from 'domains/chains/types';

interface ChainsItemLinkProps {
  chain?: Chain;
  urls: IApiChainURL[];
}

export const ChainItemLink = ({ chain, urls }: ChainsItemLinkProps) => {
  return (
    <>
      {urls.length <= 1
        ? chain &&
          urls.map(({ rpc }) => (
            <RPCInfoFun key={rpc} info={rpc} chain={chain} />
          ))
        : chain && <RPCInfoFun info={urls[0].rpc} chain={chain} />}
    </>
  );
};
