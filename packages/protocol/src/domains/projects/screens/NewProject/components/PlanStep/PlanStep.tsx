import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { newProjectIntlRoot, plans } from 'domains/projects/const';

import { PlanCard } from './components/PlanCard';
import { usePlanStepStyles } from './PlanStepStyles';
import { useSelectPlanHandler } from './hooks/useSelectPlanHandler';
import { useSelectedPlanName } from './hooks/useSelectedPlanName';
import { HowToGetStartedLink } from '../HowToGetStartedLink';

export const PlanStep = () => {
  const onCardClick = useSelectPlanHandler();
  const selectedPlanName = useSelectedPlanName();

  const { classes } = usePlanStepStyles();

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <div>
          <Typography
            variant="subtitle1"
            className={classes.title}
            component="div"
          >
            {t(`${newProjectIntlRoot}.plan-step.title`)}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {t(`${newProjectIntlRoot}.plan-step.description`)}
          </Typography>
        </div>
        <HowToGetStartedLink />
      </div>

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
