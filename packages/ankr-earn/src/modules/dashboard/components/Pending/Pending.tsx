import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { ReactChild, ReactFragment } from 'react';

import { t } from 'common';

import { DEFAULT_ROUNDING } from 'modules/common/const';
import { Tooltip } from 'uiKit/Tooltip';

import { usePendingStyles as useStyles } from './usePendingStyles';

interface IPendingProps {
  value: BigNumber;
  token: string;
  tooltip?: boolean | ReactChild | ReactFragment;
  isLoading: boolean;
  isUnstakeValueLoading?: boolean;
  onLoadHistory?: () => void;
}

export const Pending = ({
  value,
  token,
  tooltip,
  isLoading,
  isUnstakeValueLoading = false,
  onLoadHistory,
}: IPendingProps): JSX.Element => {
  const classes = useStyles();
  const hasTooltip = !!tooltip;

  const renderedPending = isUnstakeValueLoading ? (
    <Skeleton
      className={classes.pendingValue}
      height={30}
      variant="rect"
      width={80}
    />
  ) : (
    <Typography
      className={classNames(classes.root, hasTooltip && classes.hoverable)}
      onMouseEnter={onLoadHistory}
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
      interactive
      maxHeight={200}
      title={
        <div className={classes.scroll}>
          {isLoading ? 'Loading...' : tooltip}
        </div>
      }
    >
      {renderedPending}
    </Tooltip>
  ) : (
    renderedPending
  );
};
