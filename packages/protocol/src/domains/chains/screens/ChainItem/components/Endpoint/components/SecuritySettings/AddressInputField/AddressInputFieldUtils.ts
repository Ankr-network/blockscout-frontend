import { isWebUri } from 'valid-url';
import { t } from 'modules/i18n/utils/intl';

export const validateIp = (value?: string) => {
  if (typeof value !== 'string') {
    return t('validation.required');
  }

  if (!isWebUri(value)) {
    return t('validation.url-validation');
  }

  return undefined;
};
