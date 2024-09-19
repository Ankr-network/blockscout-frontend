import { INodesDetailEntity } from 'multirpc-sdk';
import { ChainID } from '@ankr.com/chains-list';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { checkChainWithSubnetsAndGetChainId } from 'domains/chains/utils/chainsUtils';

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
  useChainsFetchChainNodesDetailQuery,
  useLazyChainsFetchChainNodesDetailQuery,
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
              item => checkChainWithSubnetsAndGetChainId(chainId) === item.id,
            )
          : data;

        return { data: nodesDetail };
      }),
    }),
  }),
});
