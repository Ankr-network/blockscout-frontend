import React from 'react';
import { Typography, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { AnkrLogoIcon } from 'modules/common/components/Icons/AnkrLogoIcon';
import { t } from 'modules/i18n/utils/intl';

import { useStyles } from './useStyles';

export const Logo = () => {
  const classes = useStyles();

  return (
    <Link className={classes.root} to="/">
      <AnkrLogoIcon className={classes.logo} />
      <Divider orientation="vertical" flexItem className={classes.divider} />
      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.title}
      >
        {t('title')}
      </Typography>
    </Link>
  );
};
