import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import cn from 'classnames';

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
      <div data-testid="step" className={cn(classes.step, classes.approved)}>
        {isApproved ? <CompleteIcon size="xxs" /> : '1'}
      </div>

      <div className={classes.line} />

      <div
        data-testid="step"
        className={cn(classes.step, isApproved && classes.approved)}
      >
        2
      </div>
    </div>
  );
};
