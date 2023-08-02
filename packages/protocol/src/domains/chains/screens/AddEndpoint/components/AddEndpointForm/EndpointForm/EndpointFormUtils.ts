import { isHttpsUri } from 'valid-url';
import { Network } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { MultiService } from 'modules/api/MultiService';
import { debouncePromise } from 'modules/common/utils/debouncePromise';

const validateNode = debouncePromise(async (value: string, chainId: string) => {
  const service = MultiService.getService();
  const rpcGateway = service.getRpcGateway().getInstance(chainId as Network);

  return rpcGateway.validateNode(value);
}, 400);

const matchEndpoint = (endpoints: string[] = [], url: string) => {
  return (
    endpoints.filter(
      endpoint => endpoint.toLowerCase().replace(/\/+$/, '') === url,
    ).length > 0
  );
};

interface ValidateUserEndpointArguments {
  value?: string;
  chainId: string;
  privateUrls: string[];
  endpoints: string[];
  publicUrls: string[];
}

export const validateUserEndpoint = async ({
  value,
  chainId,
  privateUrls,
  endpoints,
  publicUrls,
}: ValidateUserEndpointArguments) => {
  if (typeof value !== 'string') {
    return t('validation.required');
  }

  const preparedValue = value.toLowerCase().replace(/\/+$/, '');

  if (!isHttpsUri(preparedValue)) {
    return t('validation.https-validation');
  }

  if (matchEndpoint(privateUrls, preparedValue)) {
    return t('validation.premium-url-validation');
  }

  if (matchEndpoint(endpoints, preparedValue)) {
    return t('validation.duplicate-url-validation');
  }

  if (matchEndpoint(publicUrls, preparedValue)) {
    return t('validation.public-url-validation');
  }

  const isAlive = await validateNode(preparedValue, chainId);

  if (!isAlive) {
    return t('validation.url-check-health');
  }

  return undefined;
};
