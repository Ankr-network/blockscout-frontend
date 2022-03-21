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
) => {
  if (typeof value !== 'string') {
    return t('validation.required');
  }

  if (!isHttpsUri(value)) {
    return t('validation.https-validation');
  }

  const isAlive = await validateNode(value, chainId);

  if (!isAlive) {
    return t('validation.url-check-health');
  }

  return undefined;
};
