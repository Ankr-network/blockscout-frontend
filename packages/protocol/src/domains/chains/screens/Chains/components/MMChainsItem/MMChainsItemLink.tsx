import { RPCInfoFun } from 'uiKit/RPCInfoFunc/RPCInfoFunc';
import { getPublicUrl } from 'domains/chains/utils/chainsUtils';
import { IApiChainURL } from 'domains/chains/api/queryChains';
import { Chain } from '../ChainsList/ChainsListTypes';
import { IJwtToken } from 'multirpc-sdk';

interface MMChainsItemLinkProps {
  credentials: IJwtToken | undefined;
  publicChain: Chain | undefined;
  urls: IApiChainURL[];
}

export const MMChainsItemLink = ({
  credentials,
  publicChain,
  urls,
}: MMChainsItemLinkProps) => {
  return (
    <>
      {urls.length <= 1
        ? publicChain &&
          urls.map(({ rpc }) => (
            <RPCInfoFun
              key={rpc}
              info={credentials ? getPublicUrl(rpc) : rpc}
              publicChain={publicChain}
            />
          ))
        : publicChain && (
            <RPCInfoFun
              info={credentials ? getPublicUrl(urls[0].rpc) : urls[0].rpc}
              publicChain={publicChain}
            />
          )}
    </>
  );
};
