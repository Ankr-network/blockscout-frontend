import React from 'react';
import BigNumber from 'bignumber.js';

import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';
import { renderBalance } from 'domains/account/utils/formatBalance';
import { useStyles } from './BalanceStyles';

export interface BalanceProps {
  balance: BigNumber;
  className?: string;
}

export const Balance = ({ balance, className }: BalanceProps) => {
  const classes = useStyles();

  return (
    <div className={className}>
      <TooltipWrapper
        tooltipClassName={classes.tooltip}
        hasIcon={false}
        tooltipText={balance.toFormat()}
      >
        {renderBalance(balance)}
      </TooltipWrapper>
    </div>
  );
};
