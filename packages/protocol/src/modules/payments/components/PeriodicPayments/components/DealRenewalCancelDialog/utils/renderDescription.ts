import { t } from '@ankr.com/common';

export interface IRenderDescriptionParams {
  expiresAt?: string;
  isDeal: boolean;
  isPackage: boolean;
}

export const renderDescription = ({
  expiresAt,
  isDeal,
  isPackage,
}: IRenderDescriptionParams) => {
  if (isPackage) {
    return t('account.package.cancel-dialog.description', {
      date: expiresAt,
    });
  }

  if (!isDeal) {
    return t('account.periodic-payments.cancel-dialog.description');
  }

  if (expiresAt) {
    return t('account.deal-renewal.cancel-dialog.description-with-date', {
      date: expiresAt,
    });
  }

  return t('account.deal-renewal.cancel-dialog.description-common');
};
