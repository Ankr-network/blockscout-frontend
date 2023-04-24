import { ChainID } from 'domains/chains/types';
import { ChainNodesTable } from './ChainNodesTable';
import { Queries } from 'modules/common/components/Queries/Queries';
import { useLazyChainsFetchChainNodesDetailQuery } from 'domains/chains/actions/fetchChainNodesDetail';
import { INodesDetailEntity } from 'multirpc-sdk';
import { checkAvalancheOrSecretAndGetChainId } from 'domains/chains/utils/chainsUtils';
import { useOnMount } from 'modules/common/hooks/useOnMount';

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
