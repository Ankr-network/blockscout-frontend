import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import { t } from 'modules/i18n/utils/intl';
import { useRightsStyles as useStyles } from './useRightsStyles';

interface IRights {
  className?: string;
}

export const Rights = ({ className = '' }: IRights) => {
  const classes = useStyles();

  return (
    <Typography
      variant="subtitle1"
      color="textSecondary"
      className={classNames(classes.root, className)}
    >
      {t('rights')}
    </Typography>
  );
};
