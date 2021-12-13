import { Typography, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { ReactComponent as AnkrLogoIcon } from '../../../../assets/img/logo.svg';

import { useLogoStyles as useStyles } from './useLogoStyles';
import classNames from 'classnames';
import { t } from 'modules/i18n/utils/intl';

export interface ILogo {
  className?: string;
}

export const Logo = ({ className = '' }: ILogo) => {
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
