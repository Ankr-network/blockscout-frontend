import { useMemo } from 'react';

import { RPCInfoFun } from 'uiKit/RPCInfoFunc/RPCInfoFunc';
import { Chain, ChainID, ChainURL } from 'domains/chains/types';

interface ChainsItemLinkProps {
  chain?: Chain;
  urls: ChainURL[];
}

export const ChainItemLink = ({ chain, urls }: ChainsItemLinkProps) => {
  const filteredUrls = useMemo(
    () => (chain?.id === ChainID.TRON ? urls.filter(item => item.rpc) : urls),
    [chain, urls],
  );

  return (
    <>
      {filteredUrls.length <= 1
        ? chain &&
          filteredUrls.map(({ rpc }) => (
            <RPCInfoFun key={rpc} info={rpc} chain={chain} />
          ))
        : chain && <RPCInfoFun info={filteredUrls[0].rpc} chain={chain} />}
    </>
  );
};
