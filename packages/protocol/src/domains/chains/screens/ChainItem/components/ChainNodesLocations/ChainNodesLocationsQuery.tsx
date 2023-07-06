import { useMemo } from 'react';
import { ChainID } from 'domains/chains/types';
import { ChainNodesLocations } from './ChainNodesLocations';
import { Queries } from 'modules/common/components/Queries/Queries';
import { useChainsFetchChainNodesDetailQuery } from 'domains/chains/actions/fetchChainNodesDetail';
import { INodesDetailEntity } from 'multirpc-sdk';
import { checkAvalancheOrSecretAndGetChainId } from 'domains/chains/utils/chainsUtils';

interface ChainNodesLocationsQueryProps {
  chainId: ChainID;
}

// https://ankrnetwork.atlassian.net/browse/MRPC-3209
// we will show real data about nodes amount for some mainnets
const REAL_NODES_RATIO_CHAIN_IDS = [ChainID.ETH, ChainID.BSC, ChainID.POLYGON];

export const ChainNodesLocationsQuery = ({
  chainId,
}: ChainNodesLocationsQueryProps) => {
  const chainState = useChainsFetchChainNodesDetailQuery();

  const checkedChainId = checkAvalancheOrSecretAndGetChainId(chainId);

  const shouldShowRealNodesRatio = useMemo(
    () => REAL_NODES_RATIO_CHAIN_IDS.includes(chainId),
    [chainId],
  );

  return (
    <Queries<INodesDetailEntity[]>
      queryStates={[chainState]}
      isPreloadDisabled
      showLoaderDuringRefetch={false}
    >
      {({ data, isLoading }) => (
        <ChainNodesLocations
          loading={isLoading}
          shouldShowRealNodesRatio={shouldShowRealNodesRatio}
          nodesDetail={data?.filter(item => item.id === checkedChainId) || []}
        />
      )}
    </Queries>
  );
};
