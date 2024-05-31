import { tHTML } from '@ankr.com/common';
import { Typography } from '@mui/material';

import { useThemes } from 'uiKit/Theme/hook/useThemes';

import { useMaintenancePageStyles } from './useMaintenancePageStyles';

export const MaintenancePage = () => {
  const { isLightTheme } = useThemes();

  const { classes } = useMaintenancePageStyles(isLightTheme);

  return (
    <div className={classes.maintenanceBody}>
      <Typography variant="h4">{tHTML('maintenance-screen')}</Typography>
    </div>
  );
};
