import { Divider, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { t } from 'modules/i18n/utils/intl';

import { ReactComponent as AnkrLogoIcon } from '../../../../assets/img/logo.svg';

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

      <Divider flexItem className={classes.divider} orientation="vertical" />

      <Typography
        className={classes.title}
        color="textSecondary"
        variant="body2"
      >
        {t('logo.earn')}
      </Typography>
    </Link>
  );
};
