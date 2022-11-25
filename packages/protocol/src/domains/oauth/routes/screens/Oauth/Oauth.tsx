import { Box } from '@material-ui/core';

import { t } from 'modules/i18n/utils/intl';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { OauthQuery } from './OauthQuery';

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
