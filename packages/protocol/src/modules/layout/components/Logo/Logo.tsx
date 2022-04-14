import React from 'react';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { GlobalMenu } from '@ankr.com/global-menu';

import { AnkrLogoIcon } from 'modules/common/components/Icons/AnkrLogoIcon';
import { t } from 'modules/i18n/utils/intl';

import { useStyles } from './useStyles';
import { useLocale } from 'modules/i18n/utils/useLocale';
import { useIsSMDown } from 'ui';

export const Logo = () => {
  const classes = useStyles();
  const { locale } = useLocale();
  const isMobile = useIsSMDown();

  return (
    <div className={classes.root}>
      <GlobalMenu project="protocol" isMobile={isMobile} locale={locale} />
      <Link className={classes.root} to="/">
        <AnkrLogoIcon className={classes.logo} />
        <Typography variant="body2" color="primary" className={classes.title}>
          {t('title')}
        </Typography>
      </Link>
    </div>
  );
};
