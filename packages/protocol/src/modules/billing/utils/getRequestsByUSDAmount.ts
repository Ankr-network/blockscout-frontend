import { USD_TO_REQUESTS_RATE } from '../const';

export const getRequestsByUSDAmount = (amount: number, extraRequestsRate = 1) =>
  amount * extraRequestsRate * USD_TO_REQUESTS_RATE;
