import { useQueryParams } from 'modules/common/hooks/useQueryParams';

import { TELEGRAM_CONFIRMATION_DATA_PARAM_NAME } from '../types';

export const useTelegramParams = () => {
  const params = useQueryParams();
  const confirmationData = params.get(TELEGRAM_CONFIRMATION_DATA_PARAM_NAME);

  return { confirmationData };
};
