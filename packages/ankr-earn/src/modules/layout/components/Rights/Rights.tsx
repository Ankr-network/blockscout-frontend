import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import { t } from 'modules/i18n/utils/intl';
import { FC } from 'react';
import { useStyles } from './useRightsStyles';

interface RightsProps {
  className?: string;
}

export const Rights: FC<RightsProps> = ({ className = '' }) => {
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
