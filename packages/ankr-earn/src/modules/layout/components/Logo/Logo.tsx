import { Divider, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { t } from 'modules/i18n/utils/intl';
import { Link } from 'react-router-dom';
import { ReactComponent as AnkrLogoIcon } from '../../../../assets/img/logo.svg';
import { useLogoStyles as useStyles } from './useLogoStyles';

export interface ILogo {
  className?: string;
  href: string;
}

export const Logo = ({ className = '', href }: ILogo) => {
  const classes = useStyles();

  return (
    <Link className={classNames(classes.root, className)} to={href}>
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
