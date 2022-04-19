import { IPrivateEndpoint } from 'multirpc-sdk';

export const initialValues = {};

export const formatDataForRequest = (
  chainId: string,
  scheme: string,
  requestUrl: string,
): IPrivateEndpoint => {
  return {
    blockchain: chainId,
    scheme,
    requestUrl,
  };
};
