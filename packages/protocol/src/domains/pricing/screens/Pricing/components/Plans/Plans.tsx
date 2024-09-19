import { Box } from '@mui/material';

import { EGeneralPlanList } from './PlansUtils';
import { usePlansStyles } from './PlansStyles';
import { EnterprisePlan, Plan } from './components/Plan';

export const Plans = () => {
  const { classes } = usePlansStyles();

  return (
    <Box className={classes.root}>
      {Object.values(EGeneralPlanList).map(planName => (
        <Plan key={`item-${planName}`} planName={planName} />
      ))}
      <EnterprisePlan />
    </Box>
  );
};
