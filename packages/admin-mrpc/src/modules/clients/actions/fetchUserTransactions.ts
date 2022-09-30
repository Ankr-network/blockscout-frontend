import {
  ITransactionsEntity,
  ITransactionsResponse,
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
  order_by?: string;
}

export interface MappedTransaction extends ITransactionsEntity {
  createdDate: Date;
}

interface IRequestResponse extends ITransactionsResponse {
  transactions: MappedTransaction[];
}

export const {
  useFetchUserTransactionsQuery,
  endpoints: { fetchUserTransactions },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUserTransactions: build.query<IRequestResponse, IRequestParams>({
      queryFn: async ({ address, cursor = 0, limit = 500 }) => {
        const service = await MultiService.getInstance();
        const backofficeGateway = await service.getBackofficeGateway();
        await authorizeBackoffice();
        const { transactions, cursor: responseCursor } =
          await backofficeGateway.getTransactions({
            address,
            cursor,
            limit,
          });

        return {
          data: {
            transactions: transactions?.map(t => ({
              ...t,
              createdDate: new Date(+t.timestamp),
            })),
            cursor: responseCursor,
          },
        };
      },
    }),
  }),
});
