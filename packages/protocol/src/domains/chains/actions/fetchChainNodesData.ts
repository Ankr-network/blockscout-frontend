import { INodeEntity, IWorkerNodesWeight } from 'multirpc-sdk';

import { IApiChain } from '../api/queryChains';
import { chainsFetchChainNodes } from './fetchChainNodes';
import { chainsFetchNodesWeight } from './fetchNodesWeight';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export interface IChainNodesData {
  nodes: INodeEntity[];
  nodesWeight: IWorkerNodesWeight[];
}

export const {
  useLazyChainsFetchChainNodesDataQuery,
  endpoints: { chainsFetchChainNodesData },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchChainNodesData: build.query<IChainNodesData, IApiChain['id'][]>({
      queryFn: createNotifyingQueryFn(async (chains, { dispatch }) => {
        const fetchNodesWeightPromise = dispatch(
          chainsFetchNodesWeight.initiate(),
        );

        const fetchChainNodesPromise = Promise.all(
          chains.map(id => dispatch(chainsFetchChainNodes.initiate(id))),
        );

        const [fetchNodesWeightDataResponse, fetchNodesResponse] =
          await Promise.all([fetchNodesWeightPromise, fetchChainNodesPromise]);

        const { data: nodesWeight = [] } = fetchNodesWeightDataResponse;

        const nodes = fetchNodesResponse.reduce<INodeEntity[]>(
          (acc, { data }) => [...acc, ...data!],
          [],
        );

        return {
          data: {
            nodesWeight,
            nodes,
          },
        };
      }),
    }),
  }),
});
