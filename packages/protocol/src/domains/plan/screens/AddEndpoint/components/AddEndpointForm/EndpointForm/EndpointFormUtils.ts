import { isHttpsUri } from 'valid-url';
import { Network } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { debouncePromise } from 'modules/common/utils/debouncePromise';
import { t } from 'modules/i18n/utils/intl';

const validateNode = debouncePromise((value: string, chainId: string) => {
  const { service } = MultiService.getInstance();
  const rpcGateway = service.getRpcGateway().getInstance(chainId as Network);
  return rpcGateway.validateNode(value);
}, 400);

export const validateUserEndpoint = async (
  value: string | undefined,
  chainId: string,
  privateUrls: string[],
  endpoints: string[],
  publicUrls: string[],
) => {
  if (typeof value !== 'string') {
    return t('validation.required');
  }

  const preparedValue = value.toLowerCase().replace(/\/$/, '');

  if (!isHttpsUri(preparedValue)) {
    return t('validation.https-validation');
  }

  if (privateUrls.includes(preparedValue)) {
    return t('validation.premium-url-validation');
  }

  if (endpoints.includes(preparedValue)) {
    return t('validation.duplicate-url-validation');
  }

  if (publicUrls.includes(preparedValue)) {
    return t('validation.public-url-validation');
  }

  const isAlive = await validateNode(preparedValue, chainId);

  if (!isAlive) {
    return t('validation.url-check-health');
  }

  return undefined;
};
