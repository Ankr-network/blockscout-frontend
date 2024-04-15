import BigNumber from 'bignumber.js';
import { ReactNode, useMemo } from 'react';

import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';

import { useBalanceTooltipStyles } from './BalanceTooltipStyles';

export interface BalanceTooltipProps {
  balance: number;
  children: ReactNode;
}

export const BalanceTooltip = ({ balance, children }: BalanceTooltipProps) => {
  const tooltip = useMemo(() => new BigNumber(balance).toFormat(), [balance]);

  const { classes } = useBalanceTooltipStyles();

  return (
    <TooltipWrapper
      hasIcon={false}
      tooltipClassName={classes.root}
      tooltipText={tooltip}
    >
      {children}
    </TooltipWrapper>
  );
};
