import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import { t } from 'modules/i18n/utils/intl';
import { ReactChild, ReactFragment } from 'react';
import { Tooltip } from 'uiKit/Tooltip';
import { usePendingStyles as useStyles } from './usePendingStyles';

interface IPendingProps {
  value: string;
  token: string;
  tooltip?: boolean | ReactChild | ReactFragment;
}

export const Pending = ({ value, token, tooltip }: IPendingProps) => {
  const classes = useStyles();
  const hasTooltip = !!tooltip;

  const renderedPending = (
    <Typography
      className={classNames(classes.root, hasTooltip && classes.hoverable)}
    >
      {t('dashboard.pending', { value, token })}
    </Typography>
  );

  return hasTooltip ? (
    <Tooltip arrow title={tooltip}>
      {renderedPending}
    </Tooltip>
  ) : (
    renderedPending
  );
};
