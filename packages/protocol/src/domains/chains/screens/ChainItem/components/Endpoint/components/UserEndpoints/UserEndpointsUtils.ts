import { IUserEndpoint } from 'domains/infrastructure/actions/fetchEndpoints';

export const getRpcLinks = (data: IUserEndpoint[]): string[] => {
  return data.map(item => item.requestUrl);
};
