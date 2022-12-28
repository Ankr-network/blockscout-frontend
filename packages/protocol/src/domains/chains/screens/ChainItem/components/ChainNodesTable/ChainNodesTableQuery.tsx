import { useEffect } from 'react';

import { ChainID } from 'modules/chains/types';
import { ChainNodesTable } from './ChainNodesTable';
import { EndpointGroup } from 'modules/endpoints/types';
import { IApiChain } from 'domains/chains/api/queryChains';
import {
  IChainNodesData,
  useLazyChainsFetchChainNodesDataQuery,
} from 'domains/chains/actions/fetchChainNodesData';
import { Queries } from 'modules/common/components/Queries/Queries';
import { getLinkedChainIDs } from './ChainNodesTableQueryUtils';

interface IChainNodesTableQueryProps {
  chain: IApiChain;
  group: EndpointGroup;
}

export const ChainNodesTableQuery = ({
  chain,
  group,
}: IChainNodesTableQueryProps) => {
  const [fetchChain, chainState] = useLazyChainsFetchChainNodesDataQuery();

  useEffect(() => {
    const chainIDs = getLinkedChainIDs(group.chains.map(({ id }) => id));

    fetchChain(chainIDs);
  }, [fetchChain, chain, group.chains]);

  return (
    <Queries<IChainNodesData> queryStates={[chainState]} isPreloadDisabled>
      {({ data, isLoading, isUninitialized }) => (
        <ChainNodesTable
          loading={(isLoading && isUninitialized) || !data}
          nodes={data?.nodes || []}
          nodesWeight={data?.nodesWeight || []}
          showNodesWithZeroHeight={chain.id === ChainID.SUI_TESTNET}
        />
      )}
    </Queries>
  );
};
