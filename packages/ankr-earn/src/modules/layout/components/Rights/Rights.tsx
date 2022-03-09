import { Typography } from '@material-ui/core';
import classNames from 'classnames';

import { t } from 'modules/i18n/utils/intl';

import { useRightsStyles } from './useRightsStyles';

interface IRights {
  className?: string;
}

export const Rights = ({ className = '' }: IRights): JSX.Element => {
  const classes = useRightsStyles();

  return (
    <Typography
      className={classNames(classes.root, className)}
      color="textSecondary"
      variant="subtitle1"
    >
      {t('rights')}
    </Typography>
  );
};
