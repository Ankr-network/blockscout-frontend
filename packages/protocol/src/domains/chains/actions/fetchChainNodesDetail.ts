import { INodesDetailEntity } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { ChainID } from 'modules/chains/types';
import { checkAvalancheOrSecretAndGetChainId } from '../utils/chainsUtils';

export const {
  endpoints: { chainsFetchChainNodesDetail },
  useLazyChainsFetchChainNodesDetailQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchChainNodesDetail: build.query<
      INodesDetailEntity[],
      ChainID | void
    >({
      queryFn: createNotifyingQueryFn(async chainId => {
        const data = await MultiService.getService()
          .getPublicGateway()
          .getNodesDetail();

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
