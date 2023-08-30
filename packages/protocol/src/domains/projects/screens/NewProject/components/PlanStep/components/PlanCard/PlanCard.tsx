import { Box, Radio, Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';
import { useCallback } from 'react';

import { Plan, PlanName } from 'domains/projects/types';

import { PlanFeatures } from '../PlanFeatures';
import { usePlanCardStyles } from './PlanCardStyles';
import offer from './assets/offer.png';
import grow from './assets/grow.png';

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
      <div className={classes.top}>
        <img
          alt={name}
          className={classes.img}
          src={name === PlanName.EarlyAdopters ? offer : grow}
        />
        {hasCheckbox && (
          <Radio
            checked={isSelected}
            disabled={disabled}
            className={classes.radio}
          />
        )}
      </div>

      <div className={classes.title}>
        <Typography variant="subtitle2">{t(title)}</Typography>
        <div className={classes.price}>{tHTML(price)}</div>
      </div>
      <PlanFeatures hasSoonLabel={disabled} description={description} />
    </Box>
  );
};
