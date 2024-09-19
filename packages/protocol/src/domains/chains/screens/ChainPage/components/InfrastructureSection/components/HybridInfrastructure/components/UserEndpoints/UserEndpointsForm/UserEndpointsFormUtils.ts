import { IPrivateEndpoint } from 'multirpc-sdk';

import { UserEndpoint } from 'domains/infrastructure/actions/fetchEndpoints';

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

export const formatDataForRequest = (data: UserEndpoint): IPrivateEndpoint => {
  const { id, name: blockchain, requestUrl, scheme } = data;

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
