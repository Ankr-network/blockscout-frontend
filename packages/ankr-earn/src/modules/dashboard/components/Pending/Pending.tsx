import { Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { DEFAULT_ROUNDING } from 'modules/common/const';
import { t } from 'modules/i18n/utils/intl';
import { ReactChild, ReactFragment } from 'react';
import { Tooltip } from 'uiKit/Tooltip';
import { usePendingStyles as useStyles } from './usePendingStyles';

interface IPendingProps {
  value: BigNumber;
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
      {t('dashboard.pending', {
        value: value.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
        token,
      })}
    </Typography>
  );

  return hasTooltip ? (
    <Tooltip
      arrow
      title={<div className={classes.scroll}>{tooltip}</div>}
      interactive
      maxHeight={200}
    >
      {renderedPending}
    </Tooltip>
  ) : (
    renderedPending
  );
};
