import { USD_TO_REQUESTS_RATE } from '../const';

export const getRequestsByUSDAmount = (amount: number) =>
  amount * USD_TO_REQUESTS_RATE;
