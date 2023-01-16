import { format } from 'date-fns';

import { Options } from 'hooks/useQueryEndpoint';

export const formatDate = (timestamp: number) =>
  format(new Date(Number(timestamp)), 'HH:mm:ss, MMM d');

export const options: Options = {
  subscriptionOptions: {
    pollingInterval: 20_000,
  },
};

export const formatPayload = (payload: string) => {
  return payload?.split(',')?.join(', ');
};
