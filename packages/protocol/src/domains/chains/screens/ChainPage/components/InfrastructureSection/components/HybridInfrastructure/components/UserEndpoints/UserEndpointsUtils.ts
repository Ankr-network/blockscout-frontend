import { UserEndpoint } from 'domains/infrastructure/actions/fetchEndpoints';

export const getRpcLinks = (data: UserEndpoint[]): string[] => {
  return data.map(item => item.requestUrl);
};
