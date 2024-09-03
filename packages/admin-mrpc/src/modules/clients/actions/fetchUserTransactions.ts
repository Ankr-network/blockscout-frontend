import {
  ITransactionsEntity,
  TPaymentHistoryEntityType,
  Web3Address,
} from 'multirpc-sdk';

import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';

import { authorizeBackoffice } from '../utils/authorizeBackoffice';

interface IRequestParams {
  address: Web3Address;
  cursor?: number;
  limit?: number;
  blockchain?: string;
  types?: TPaymentHistoryEntityType[];
  order_by?: string;
}

export interface MappedTransaction extends ITransactionsEntity {
  createdDate: Date;
}

interface IRequestResponse {
  transactions: MappedTransaction[];
  cursor?: number;
}

export const {
  useFetchUserTransactionsQuery,
  useLazyFetchUserTransactionsQuery,
  endpoints: { fetchUserTransactions },
} = web3Api.injectEndpoints({
  endpoints: build => {
    let transactionsCollection: ITransactionsEntity[] = [];

    return {
      fetchUserTransactions: build.query<IRequestResponse, IRequestParams>({
        queryFn: async ({ address, types, cursor = 0, limit = 20 }) => {
          if (cursor === 0) {
            transactionsCollection = [];
          }

          const service = await MultiService.getWeb3Service();
          const backofficeGateway = await service.getBackofficeGateway();

          await authorizeBackoffice();

          const { transactions = [], cursor: responseCursor } =
            await backofficeGateway.getTransactions({
              cursor,
              address,
              limit,
              types,
            });

          if (cursor === 0) {
            transactionsCollection = [...transactions];
          } else {
            transactionsCollection = [
              ...transactionsCollection,
              ...transactions,
            ];
          }

          return {
            data: {
              transactions: transactionsCollection?.map(transaction => ({
                ...transaction,
                createdDate: new Date(+transaction.timestamp),
              })),
              cursor: Number(responseCursor),
            },
          };
        },
      }),
    };
  },
  overrideExisting: true,
});
