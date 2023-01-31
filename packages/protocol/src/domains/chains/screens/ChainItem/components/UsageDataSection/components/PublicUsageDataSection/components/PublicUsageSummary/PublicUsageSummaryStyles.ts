import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useUsageSummaryStyles = makeStyles()((theme: Theme) => ({
  usageSummary: {
    display: 'flex',
    gap: theme.spacing(2 * 3.75),

    [theme.breakpoints.down('lg')]: {
      gap: theme.spacing(2 * 2),
    },

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  stat: {
    flex: 1,
  },
}));
