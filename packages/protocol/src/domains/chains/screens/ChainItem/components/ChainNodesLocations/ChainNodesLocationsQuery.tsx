import { ChainID } from 'domains/chains/types';
import { ChainNodesLocations } from './ChainNodesLocations';
import { Queries } from 'modules/common/components/Queries/Queries';
import { useChainsFetchChainNodesDetailQuery } from 'domains/chains/actions/fetchChainNodesDetail';
import { INodesDetailEntity } from 'multirpc-sdk';
import { checkAvalancheOrSecretAndGetChainId } from 'domains/chains/utils/chainsUtils';

interface ChainNodesLocationsQueryProps {
  chainId: ChainID;
}

export const ChainNodesLocationsQuery = ({
  chainId,
}: ChainNodesLocationsQueryProps) => {
  const chainState = useChainsFetchChainNodesDetailQuery();

  const checkedChainId = checkAvalancheOrSecretAndGetChainId(chainId);

  return (
    <Queries<INodesDetailEntity[]>
      queryStates={[chainState]}
      isPreloadDisabled
      showLoaderDuringRefetch={false}
    >
      {({ data, isLoading }) => (
        <ChainNodesLocations
          loading={isLoading}
          nodesDetail={data?.filter(item => item.id === checkedChainId) || []}
        />
      )}
    </Queries>
  );
};
