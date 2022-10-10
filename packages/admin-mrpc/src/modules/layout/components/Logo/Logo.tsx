import React from 'react';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { GlobalMenu } from '@ankr.com/global-menu';

import { useIsSMDown } from 'ui';
import { AnkrLogoIcon } from 'modules/common/components/Icons/AnkrLogoIcon';
import { t } from 'modules/i18n/utils/intl';
import { useLocale } from 'modules/i18n/utils/useLocale';
import { useStyles } from './useStyles';

export const Logo = () => {
  const classes = useStyles();
  const { locale } = useLocale();
  const isMobile = useIsSMDown();

  return (
    <div className={classes.root}>
      <GlobalMenu project="ankrscan" isMobile={isMobile} locale={locale} />
      <Link className={classes.root} to="/">
        <AnkrLogoIcon className={classes.logo} />
        <Typography variant="body2" color="primary" className={classes.title}>
          {t('clientsTitle')}
        </Typography>
      </Link>
    </div>
  );
};
