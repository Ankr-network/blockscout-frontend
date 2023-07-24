import { t } from '@ankr.com/common';

import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';

import { OauthQuery } from './OauthQuery';

export const Oauth = () => {
  useSetBreadcrumbs([
    {
      title: t('oauth.breadcrumbs'),
    },
  ]);

  return <OauthQuery />;
};
