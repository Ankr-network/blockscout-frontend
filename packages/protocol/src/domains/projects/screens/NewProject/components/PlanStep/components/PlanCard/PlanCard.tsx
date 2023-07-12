import { Box, Radio } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';
import { useCallback } from 'react';

import { Plan, PlanName } from 'domains/projects/types';
import { PlanFeatures } from '../PlanFeatures';
import { newProjectIntlRoot } from 'domains/projects/const';
import { usePlanCardStyles } from './PlanCardStyles';

export interface PlanProps {
  isSelected?: boolean;
  onClick: (name: PlanName) => void;
  plan: Plan;
}

export const PlanCard = ({
  isSelected = false,
  onClick: select,
  plan,
}: PlanProps) => {
  const { disabled = false, monthUSDPrice: price, name, title } = plan;

  const onClick = useCallback(() => {
    if (!disabled) {
      select(name);
    }
  }, [disabled, name, select]);

  const { classes, cx } = usePlanCardStyles();

  const className = cx(classes.root, {
    [classes.disabled]: disabled,
    [classes.selected]: isSelected,
  });

  return (
    <Box className={className} onClick={onClick}>
      <div className={classes.title}>
        {t(title)}
        <Radio checked={isSelected} disabled={disabled} />
      </div>
      <div className={classes.price}>
        {tHTML(`${newProjectIntlRoot}.plan-step.price`, { price })}
      </div>
      <PlanFeatures hasSoonLabel={disabled} plan={plan} />
    </Box>
  );
};