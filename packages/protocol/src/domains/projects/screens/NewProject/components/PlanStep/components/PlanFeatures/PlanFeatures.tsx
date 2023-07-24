import { tHTML } from '@ankr.com/common';

import { SoonLabel } from 'modules/common/components/SoonLabel';

import { usePlanFeaturesStyles } from './PlanFeaturesStyles';

export interface PlanFeaturesProps {
  description: string;
  hasSoonLabel?: boolean;
}

export const PlanFeatures = ({
  hasSoonLabel,
  description,
}: PlanFeaturesProps) => {
  const { classes } = usePlanFeaturesStyles();

  return (
    <div className={classes.root}>
      <div className={classes.features}>{tHTML(description)}</div>
      {hasSoonLabel && <SoonLabel className={classes.soonLabel} />}
    </div>
  );
};
