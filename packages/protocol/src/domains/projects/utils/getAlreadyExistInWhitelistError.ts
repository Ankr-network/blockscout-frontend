import { UserEndpointTokenMode } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

const errorsMap: Record<UserEndpointTokenMode, () => string> = {
  [UserEndpointTokenMode.ADDRESS]: () =>
    t('validation.smart-contract-already-exist'),
  [UserEndpointTokenMode.ALL]: () => '',
  [UserEndpointTokenMode.IP]: () => t('validation.ip-already-exist'),
  [UserEndpointTokenMode.REFERER]: () => t('validation.domain-already-exist'),
};

export const getAlreadyExistInWhitelistError = (type: UserEndpointTokenMode) =>
  errorsMap[type]();
