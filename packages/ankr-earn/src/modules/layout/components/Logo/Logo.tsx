import React, { FC } from 'react';
import { Typography, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { AnkrLogoIcon } from '../../../common/components/Icons/AnkrLogoIcon';

import { useStyles } from './useLogoStyles';
import classNames from 'classnames';
import { t } from 'modules/i18n/utils/intl';

export interface ILogo {
  className?: string;
}

export const Logo: FC<ILogo> = ({ className = '' }) => {
  const classes = useStyles();

  return (
    <Link className={classNames(classes.root, className)} to="/">
      <AnkrLogoIcon className={classes.logo} />
      <Divider orientation="vertical" flexItem className={classes.divider} />
      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.title}
      >
        {t('logo.earn')}
      </Typography>
    </Link>
  );
};
