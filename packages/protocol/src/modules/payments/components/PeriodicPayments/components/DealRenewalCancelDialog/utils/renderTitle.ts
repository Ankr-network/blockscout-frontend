import { t } from '@ankr.com/common';

export interface IRenderTitleParams {
  isDeal: boolean;
  isPackage: boolean;
}

export const renderTitle = ({ isDeal, isPackage }: IRenderTitleParams) => {
  if (isPackage) {
    return t('account.package.cancel-dialog.title');
  }

  if (isDeal) {
    return t('account.deal-renewal.cancel-dialog.title');
  }

  return t('account.periodic-payments.cancel-dialog.title');
};
