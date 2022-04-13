import { t } from 'modules/i18n/utils/intl';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';

export const useTopUpBreadcrumbs = () => {
  useSetBreadcrumbs([
    {
      title: t(AccountRoutesConfig.accountDetails.breadcrumbs),
      link: AccountRoutesConfig.accountDetails.generatePath(),
    },
    {
      title: t(AccountRoutesConfig.topUp.breadcrumbs),
    },
  ]);
};
