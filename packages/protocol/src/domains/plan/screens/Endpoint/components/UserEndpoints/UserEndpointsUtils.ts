import { IUserEndpoint } from 'domains/nodeProviders/actions/fetchEndpoints';

export const getRpcLinks = (data: IUserEndpoint[]): string[] => {
  return data.map(item => item.requestUrl);
};
