import { t } from '@ankr.com/common';

import { OauthQuery } from './OauthQuery';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';

export const Oauth = () => {
  useSetBreadcrumbs([
    {
      title: t('oauth.breadcrumbs'),
    },
  ]);

  return <OauthQuery />;
};
