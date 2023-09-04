import { Box } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';

import { Plan } from 'domains/projects/types';
import { newProjectIntlRoot } from 'domains/projects/const';

import { useCurrentPlanStyles } from './useCurrentPlanStyles';

export interface CurrentPlanProps {
  plan: Plan;
  // only need if the usage element is enabled
  projectsAllowed?: number;
  projectsUsed?: number;
}

const HAS_USAGE_ELEMENT = false;

export const CurrentPlan = ({
  plan: { description, price, title },
  projectsAllowed,
  projectsUsed,
}: CurrentPlanProps) => {
  const { classes } = useCurrentPlanStyles();

  return (
    <Box>
      <div className={classes.header}>
        <div className={classes.title}>
          {t(title)}
          {HAS_USAGE_ELEMENT && (
            <div className={classes.usage}>
              {t(`${newProjectIntlRoot}.checkout-step.usage`, {
                projectsAllowed,
                projectsUsed,
              })}
            </div>
          )}
        </div>
        <div className={classes.price}>{tHTML(price)}</div>
      </div>
      <div className={classes.features}>{tHTML(description)}</div>
    </Box>
  );
};
