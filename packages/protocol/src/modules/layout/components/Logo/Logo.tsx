import React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { GlobalMenu } from '@ankr.com/global-menu';
import { t } from '@ankr.com/common';

import { AnkrLogoIcon } from 'modules/common/components/Icons/AnkrLogoIcon';
import { useLocale } from 'modules/i18n/utils/useLocale';
import { useIsSMDown } from 'uiKit/Theme/useTheme';
import { useThemes } from 'uiKit/Theme/hook/useThemes';

import { useStyles } from './useStyles';

export const Logo = () => {
  const { themes } = useThemes();
  const { classes } = useStyles();
  const { locale } = useLocale();
  const isMobile = useIsSMDown();

  return (
    <div className={classes.root}>
      <GlobalMenu
        themes={themes}
        locale={locale}
        isMobile={isMobile}
        project="rpc"
      />
      <Link className={classes.root} to="/">
        <AnkrLogoIcon className={classes.logo} />
        <Typography variant="body2" color="primary" className={classes.title}>
          {t('title')}
        </Typography>
      </Link>
    </div>
  );
};
