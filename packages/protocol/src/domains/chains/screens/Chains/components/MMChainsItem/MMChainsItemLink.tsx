import { RPCInfoFun } from 'uiKit/RPCInfoFunc/RPCInfoFunc';
import { IApiChainURL } from 'domains/chains/api/queryChains';
import { Chain } from '../ChainsList/ChainsListTypes';

interface MMChainsItemLinkProps {
  publicChain: Chain | undefined;
  urls: IApiChainURL[];
}

export const MMChainsItemLink = ({
  publicChain,
  urls,
}: MMChainsItemLinkProps) => {
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
