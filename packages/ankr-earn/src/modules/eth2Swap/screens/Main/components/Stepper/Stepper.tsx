import BigNumber from 'bignumber.js';
import cn from 'classnames';
import { useEffect, useState } from 'react';

import { CompleteIcon } from 'uiKit/Icons/CompleteIcon';

import { useEth2SwapStepperStyles } from './useSwapOptionsStyles';

export interface IStepperProps {
  allowance: BigNumber;
}

export const Stepper = ({ allowance }: IStepperProps): JSX.Element => {
  const classes = useEth2SwapStepperStyles();
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    setIsApproved(!allowance.isZero());
  }, [allowance]);

  return (
    <div className={classes.root}>
      <div className={cn(classes.step, classes.approved)} data-testid="step">
        {isApproved ? <CompleteIcon size="xxs" /> : '1'}
      </div>

      <div className={classes.line} />

      <div
        className={cn(classes.step, isApproved && classes.approved)}
        data-testid="step"
      >
        2
      </div>
    </div>
  );
};
