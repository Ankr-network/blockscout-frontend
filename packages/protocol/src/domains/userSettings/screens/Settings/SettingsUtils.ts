import { t } from 'common';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';

export const useSettingsBreadcrumbs = () => {
  useSetBreadcrumbs([
    {
      title: t(UserSettingsRoutesConfig.settings.breadcrumbs),
    },
  ]);
};
