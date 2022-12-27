import { Box } from '@material-ui/core';

import { OauthQuery } from './OauthQuery';
import { t } from 'modules/i18n/utils/intl';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';

export const Oauth = () => {
  useSetBreadcrumbs([
    {
      title: t('oauth.breadcrumbs'),
    },
  ]);

  return (
    <Box>
      <OauthQuery />
    </Box>
  );
};
