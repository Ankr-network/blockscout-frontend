import { Theme } from '@mui/material';

export const useChartBar = (theme: Theme) => {
  return [
    { name: 'total', fill: theme.palette.primary.main },
    { name: 'rejectedRequestsCount', fill: theme.palette.error.main },
  ];
};
