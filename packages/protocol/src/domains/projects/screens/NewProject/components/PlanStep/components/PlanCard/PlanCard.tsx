import { Box, Radio } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';
import { useCallback } from 'react';

import { Plan, PlanName } from 'domains/projects/types';

import { PlanFeatures } from '../PlanFeatures';
import { usePlanCardStyles } from './PlanCardStyles';

export interface PlanProps {
  isSelected?: boolean;
  onClick?: (name: PlanName) => void;
  plan: Plan;
  hasCheckbox?: boolean;
  className?: string;
}

export const PlanCard = ({
  isSelected = false,
  onClick: select,
  plan,
  hasCheckbox = true,
  className,
}: PlanProps) => {
  const { disabled, name, title, price, description } = plan;

  const onClick = useCallback(() => {
    if (!disabled && select) {
      select(name);
    }
  }, [disabled, name, select]);

  const { classes, cx } = usePlanCardStyles();

  const wrapperClassName = cx(
    classes.root,
    {
      [classes.disabled]: disabled,
      [classes.selected]: isSelected,
    },
    className,
  );

  return (
    <Box className={wrapperClassName} onClick={onClick}>
      <div className={classes.title}>
        <span>{t(title)}</span>
        {hasCheckbox && (
          <Radio
            checked={isSelected}
            disabled={disabled}
            className={classes.radio}
          />
        )}
      </div>
      <div className={classes.price}>{tHTML(price)}</div>
      <PlanFeatures hasSoonLabel={disabled} description={description} />
    </Box>
  );
};
