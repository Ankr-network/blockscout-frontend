import { INodesDetailEntity } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { ChainID } from 'domains/chains/types';

import { checkAvalancheOrSecretAndGetChainId } from '../utils/chainsUtils';

let cachedNodeDetails: INodesDetailEntity[] | null = null;

const getNodesDetail = async () => {
  if (!cachedNodeDetails) {
    cachedNodeDetails = await MultiService.getService()
      .getPublicGateway()
      .getNodesDetail();
  }

  return cachedNodeDetails;
};

export const {
  endpoints: { chainsFetchChainNodesDetail },
  useLazyChainsFetchChainNodesDetailQuery,
  useChainsFetchChainNodesDetailQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchChainNodesDetail: build.query<
      INodesDetailEntity[],
      ChainID | void
    >({
      queryFn: createNotifyingQueryFn(async chainId => {
        const data = await getNodesDetail();

        const nodesDetail = chainId
          ? data.filter(
              item => checkAvalancheOrSecretAndGetChainId(chainId) === item.id,
            )
          : data;

        return { data: nodesDetail };
      }),
    }),
  }),
});
