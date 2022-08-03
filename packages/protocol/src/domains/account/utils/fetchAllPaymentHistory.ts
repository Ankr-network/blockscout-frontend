import {
  IAggregatedPaymentHistoryRequest as Request,
  IAggregatedPaymentHistoryReponse as Response,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';

export const fetchAllPaymentHistory = async (
  request: Request,
  response: Response = { cursor: '0', transactions: [] },
): Promise<Response> => {
  const service = await MultiService.getInstance();

  const { cursor, transactions } = await service.getAggregatedPaymentHistory(
    request,
  );

  const result: Response = {
    cursor,
    transactions: [...response.transactions, ...transactions],
  };

  if (cursor !== '-1') {
    const nextRequest: Request = {
      ...request,
      cursor: Number(cursor) || 0,
    };

    return fetchAllPaymentHistory(nextRequest, result);
  }

  return result;
};
