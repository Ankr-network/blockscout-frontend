import { ITransactionsEntity, Web3Address } from 'multirpc-sdk';
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

interface IRequestResponse {
  transactions: MappedTransaction[];
  cursor?: number;
}

let transactionsCollection: ITransactionsEntity[] = [];

export const {
  useFetchUserTransactionsQuery,
  useLazyFetchUserTransactionsQuery,
  endpoints: { fetchUserTransactions },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUserTransactions: build.query<IRequestResponse, IRequestParams>({
      queryFn: async ({ address, cursor = 0, limit = 100 }) => {
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
          });

        if (cursor === 0) {
          transactionsCollection = [...transactions];
        } else {
          transactionsCollection = [...transactionsCollection, ...transactions];
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
  }),
  overrideExisting: true,
});
