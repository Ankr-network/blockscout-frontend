import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { newProjectIntlRoot, plans } from 'domains/projects/const';

import { PlanCard } from './components/PlanCard';
import { usePlanStepStyles } from './PlanStepStyles';
import { useSelectPlanHandler } from './hooks/useSelectPlanHandler';
import { useSelectedPlanName } from './hooks/useSelectedPlanName';

export const PlanStep = () => {
  const onCardClick = useSelectPlanHandler();
  const selectedPlanName = useSelectedPlanName();

  const { classes } = usePlanStepStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        {t(`${newProjectIntlRoot}.plan-step.title`)}
      </Typography>
      <div className={classes.cards}>
        {plans.map(plan => (
          <PlanCard
            isSelected={selectedPlanName === plan.name}
            key={plan.name}
            onClick={onCardClick}
            plan={plan}
          />
        ))}
      </div>
    </div>
  );
};
