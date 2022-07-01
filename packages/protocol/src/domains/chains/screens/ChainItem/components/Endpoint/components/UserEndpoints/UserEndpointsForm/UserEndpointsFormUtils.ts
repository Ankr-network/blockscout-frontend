import { IUserEndpoint } from 'domains/infrastructure/actions/fetchEndpoints';
import { IPrivateEndpoint } from 'multirpc-sdk';
import {
  UserEndpointsFormData,
  UserEndpointsProps,
} from './UserEndpointsFormTypes';

export const getInitialValues = (
  endpoints: UserEndpointsProps['endpoints'],
): UserEndpointsFormData => {
  return {
    rpcLinks: endpoints,
  };
};

export const formatDataForRequest = (data: IUserEndpoint): IPrivateEndpoint => {
  const { name: blockchain, scheme, requestUrl, id } = data;

  return {
    id,
    scheme,
    requestUrl,
    blockchain,
  };
};

export const getRpcLinks = (values: UserEndpointsFormData['rpcLinks']) => {
  return values.map(item => item.requestUrl);
};
