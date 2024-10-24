import { TELEGRAM_CONFIRMATION_DATA_PARAM_NAME } from '../types';

export const isTelegramConfirmationQuery = (query: string) => {
  const queryParams = new URLSearchParams(query);

  return queryParams.has(TELEGRAM_CONFIRMATION_DATA_PARAM_NAME);
};
