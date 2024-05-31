import { tHTML } from '@ankr.com/common';
import { Typography } from '@mui/material';

import { useMaintenancePageStyles } from './useMaintenancePageStyles';

export const MaintenancePage = () => {
  const { classes } = useMaintenancePageStyles();

  return (
    <div className={classes.maintenanceBody}>
      <Typography variant="h4">{tHTML('maintenance-screen')}</Typography>
    </div>
  );
};
