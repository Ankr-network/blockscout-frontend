import { Theme } from '@mui/material';

export const useChartBar = (theme: Theme) => {
  return [{ name: 'successRequestsCount', fill: theme.palette.primary.main }];
};
