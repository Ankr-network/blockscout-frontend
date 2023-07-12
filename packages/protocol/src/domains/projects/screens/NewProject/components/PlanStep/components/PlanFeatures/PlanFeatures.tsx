import { Plan } from 'domains/projects/types';
import { SoonLabel } from 'modules/common/components/SoonLabel';
import {
  get2ndFeatureByPlanName,
  get3rdFeatureByPlanName,
  getRequestsFromType,
} from './utils/getCustomableValue';
import { getSupportType } from './utils/getSupportType';
import { usePlanFeaturesStyles } from './PlanFeaturesStyles';

export interface PlanFeaturesProps {
  plan: Plan;
  hasSoonLabel?: boolean;
}

export const PlanFeatures = ({ hasSoonLabel, plan }: PlanFeaturesProps) => {
  const { name, requestsType, support } = plan;

  const { classes } = usePlanFeaturesStyles();

  return (
    <div className={classes.root}>
      <div className={classes.features}>
        {getRequestsFromType(requestsType)}
        {get2ndFeatureByPlanName(name)}
        {get3rdFeatureByPlanName(name)}
        {getSupportType(support)}
      </div>
      {hasSoonLabel && <SoonLabel className={classes.soonLabel} />}
    </div>
  );
};
