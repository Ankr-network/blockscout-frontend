import { resetRequests, stopPolling } from '@redux-requests/core';
import { useDispatchRequest } from '@redux-requests/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchChainNodesData } from 'domains/chains/actions/fetchChainNodesData';
import { IApiChain } from 'domains/chains/api/queryChains';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { Queries } from 'modules/common/components/Queries/Queries';
import { EndpointGroup } from 'modules/endpoints/types';
import { ChainNodesTable } from './ChainNodesTable';
import { getLinkedChainIDs } from './ChainNodesTableQueryUtils';

interface IChainNodesTableQueryProps {
  chain: IApiChain;
  group: EndpointGroup;
}

export const ChainNodesTableQuery = ({
  chain,
  group,
}: IChainNodesTableQueryProps) => {
  const dispatch = useDispatch();
  const dispatchRequest = useDispatchRequest();

  useEffect(() => {
    const chainIDs = getLinkedChainIDs(group.chains.map(({ id }) => id));

    dispatchRequest(fetchChainNodesData(chainIDs));

    return () => {
      dispatch(resetRequests([fetchChainNodesData.toString()]));

      dispatch(stopPolling([fetchChainNodesData.toString()]));
    };
  }, [chain, dispatch, dispatchRequest, group.chains]);

  return (
    <Queries<ResponseData<typeof fetchChainNodesData> | null>
      requestActions={[fetchChainNodesData]}
      isPreloadDisabled
    >
      {({ data, loading, pristine }) => (
        <ChainNodesTable
          loading={(loading && pristine) || !data}
          nodes={data?.nodes || []}
          nodesWeight={data?.nodesWeight || []}
        />
      )}
    </Queries>
  );
};
