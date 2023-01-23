import { format } from 'date-fns';
import { t } from '@ankr.com/common';

import { Options } from 'hooks/useQueryEndpoint';

export const formatDate = (timestamp: number) =>
  format(new Date(Number(timestamp)), 'HH:mm:ss, MMM d');

export const options: Options = {
  subscriptionOptions: {
    pollingInterval: 15_000,
  },
};

const JOINER = ', ';

export const formatPayload = (payload: string) => {
  if (!payload) return t('chain-item.usage-data.last-requests.unknown');

  return payload?.split(',')?.join(JOINER);
};

const MAX_METHOD_LENGTH = 20;

export const checkPayloadNowrap = (payload: string) => {
  return payload.split(JOINER).some(el => el.length > MAX_METHOD_LENGTH);
};
