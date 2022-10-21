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
        // TODO: tmp fix while waiting for backend feature with transactions total revenue
        // https://ankrnetwork.atlassian.net/browse/MRPC-1668
        let transactionsCollection: ITransactionsEntity[] = [];
        const fetchAllTransactions = async () => {
          let currentCursor: string | number | undefined = '0';
          while (currentCursor && currentCursor !== '-1' && cursor !== -1) {
            try {
              // @ts-ignore
              const { transactions, cursor: responseCursor } =
                // eslint-disable-next-line no-await-in-loop
                await backofficeGateway.getTransactions({
                  cursor: +currentCursor,
                  address,
                  limit,
                });
              currentCursor = responseCursor;

              transactionsCollection = [
                ...transactionsCollection,
                ...(transactions || []),
              ];
            } catch (e) {
              // eslint-disable-next-line no-console
              console.warn(e);
              break;
            }
          }
        };
        await fetchAllTransactions();

        return {
          data: {
            transactions: transactionsCollection?.map(transaction => ({
              ...transaction,
              createdDate: new Date(+transaction.timestamp),
            })),
          },
        };
      },
    }),
  }),
});
