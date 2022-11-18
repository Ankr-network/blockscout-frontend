import { t } from '@ankr.com/common';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { ReactComponent as AnkrLogoIcon } from 'assets/img/logo.svg';

import { useLogoStyles as useStyles } from './useLogoStyles';

export interface ILogo {
  className?: string;
  href: string;
}

export const Logo = ({ className = '', href }: ILogo): JSX.Element => {
  const classes = useStyles();

  return (
    <Link className={classNames(classes.root, className)} to={href}>
      <AnkrLogoIcon className={classes.logo} />

      <Typography className={classes.title} color="primary" variant="body2">
        {t('logo.staking')}
      </Typography>
    </Link>
  );
};
