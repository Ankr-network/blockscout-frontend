import { t } from '@ankr.com/common';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';

export const useConfirmationBreadcrumbs = () => {
  useSetBreadcrumbs([
    {
      title: t(UserSettingsRoutesConfig.confirmation.breadcrumbs),
    },
  ]);
};
