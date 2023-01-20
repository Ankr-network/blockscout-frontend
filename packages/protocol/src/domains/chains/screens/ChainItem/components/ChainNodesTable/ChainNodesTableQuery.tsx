import { useEffect } from 'react';

import { ChainID } from 'modules/chains/types';
import { ChainNodesTable } from './ChainNodesTable';
import { Queries } from 'modules/common/components/Queries/Queries';
import { useLazyChainsFetchChainNodesDetailQuery } from 'domains/chains/actions/fetchChainNodesDetail';
import { INodesDetailEntity } from 'multirpc-sdk';

interface IChainNodesTableQueryProps {
  chainId: ChainID;
}

export const ChainNodesTableQuery = ({
  chainId,
}: IChainNodesTableQueryProps) => {
  const [fetchChain, chainState] = useLazyChainsFetchChainNodesDetailQuery();

  useEffect(() => {
    fetchChain(chainId);
  }, [chainId, fetchChain]);

  return (
    <Queries<INodesDetailEntity[]> queryStates={[chainState]} isPreloadDisabled>
      {({ data, isLoading, isUninitialized }) => (
        <ChainNodesTable
          loading={(isLoading && isUninitialized) || !data}
          nodesDetail={data || []}
          showNodesWithZeroHeight={chainId === ChainID.SUI_TESTNET}
        />
      )}
    </Queries>
  );
};
