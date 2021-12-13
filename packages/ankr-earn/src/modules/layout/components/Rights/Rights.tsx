import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import { t } from 'modules/i18n/utils/intl';
import { useRightsStyles } from './useRightsStyles';

interface IRights {
  className?: string;
}

export const Rights = ({ className = '' }: IRights) => {
  const classes = useRightsStyles();

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
