import { RPCInfoFun } from 'uiKit/RPCInfoFunc/RPCInfoFunc';
import { Chain, ChainURL } from 'domains/chains/types';

interface ChainsItemLinkProps {
  chain?: Chain;
  urls: ChainURL[];
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
