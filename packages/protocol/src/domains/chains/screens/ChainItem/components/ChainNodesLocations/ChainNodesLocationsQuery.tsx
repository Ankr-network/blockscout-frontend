import { useMemo } from 'react';
import { INodesDetailEntity } from 'multirpc-sdk';
import { ChainID } from '@ankr.com/chains-list';

import { Queries } from 'modules/common/components/Queries/Queries';
import { useChainsFetchChainNodesDetailQuery } from 'modules/chains/actions/fetchChainNodesDetail';
import { checkChainWithSubnetsAndGetChainId } from 'domains/chains/utils/chainsUtils';

import { ChainNodesLocations } from './ChainNodesLocations';

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

  const checkedChainId = checkChainWithSubnetsAndGetChainId(chainId);

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
