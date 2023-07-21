import { INodesDetailEntity } from 'multirpc-sdk';

import { Queries } from 'modules/common/components/Queries/Queries';
import { useLazyChainsFetchChainNodesDetailQuery } from 'domains/chains/actions/fetchChainNodesDetail';
import { ChainID } from 'domains/chains/types';
import { checkAvalancheOrSecretAndGetChainId } from 'domains/chains/utils/chainsUtils';
import { useOnMount } from 'modules/common/hooks/useOnMount';

import { ChainNodesTable } from './ChainNodesTable';

interface IChainNodesTableQueryProps {
  chainId: ChainID;
}

export const ChainNodesTableQuery = ({
  chainId,
}: IChainNodesTableQueryProps) => {
  const [fetchChain, chainState] = useLazyChainsFetchChainNodesDetailQuery();

  useOnMount(() => {
    fetchChain();
  });

  const checkedChainId = checkAvalancheOrSecretAndGetChainId(chainId);

  return (
    <Queries<INodesDetailEntity[]> queryStates={[chainState]} isPreloadDisabled>
      {({ data, isLoading, isUninitialized }) => (
        <ChainNodesTable
          loading={(isLoading && isUninitialized) || !data}
          nodesDetail={data?.filter(item => item.id === checkedChainId) || []}
          showNodesWithZeroHeight={chainId === ChainID.SUI_TESTNET}
        />
      )}
    </Queries>
  );
};
