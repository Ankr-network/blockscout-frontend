import classNames from 'classnames';
import { ReactNode } from 'react';

import { EProviderStatus } from 'modules/stake-ankr/const';
import { Tooltip } from 'uiKit/Tooltip';

import { ReactComponent as ClockIcon } from './assets/clock-icon.svg';
import { useProviderStatusStyles } from './useProviderStatusStyles';

interface IProviderStatusProps {
  type?: EProviderStatus;
  tooltipSlot?: ReactNode;
  className?: string;
}

export const ProviderStatus = ({
  type = EProviderStatus.good,
  tooltipSlot,
  className,
}: IProviderStatusProps): JSX.Element => {
  const withTooltip = !!tooltipSlot;
  const classes = useProviderStatusStyles();
  const isBonding = type === EProviderStatus.bonding;

  const renderedStatus = (
    <span
      className={classNames(classes.status, className, {
        [classes.green]: type === EProviderStatus.good,
        [classes.red]: type === EProviderStatus.bad,
        [classes.statusWithTooltip]: withTooltip,
        [classes.statusDotIcon]: !isBonding,
      })}
    >
      {isBonding && <ClockIcon className={classes.clockIcon} />}
    </span>
  );

  return withTooltip ? (
    <Tooltip arrow title={tooltipSlot}>
      {renderedStatus}
    </Tooltip>
  ) : (
    renderedStatus
  );
};
