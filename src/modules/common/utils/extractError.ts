import { t } from '../../i18n/utils/intl';

export function extractMessage(error: any) {
  if (typeof error === 'string') {
    return error;
  }

  if (error?.code === 4001) {
    return t('error.contract-rejected');
  }

  if (error instanceof Error) {
    return error.toString();
  }

  return t('error.unexpected');
}
