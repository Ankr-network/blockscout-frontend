import { t } from '../../i18n/utils/intl';

export function extractMessage(
  errorResponse: any,
  customMessage?: string,
): string {
  if (customMessage) {
    return t(customMessage);
  }

  if (typeof errorResponse === 'string') {
    return errorResponse;
  }

  if (errorResponse?.code === 4001) {
    return t('error.contract-rejected');
  }

  if (errorResponse instanceof Error) {
    return errorResponse.toString();
  }

  if (errorResponse?.error?.error instanceof Error) {
    return errorResponse.error.error.toString();
  }

  return t('error.unexpected');
}
