import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useUsageSummaryStyles = makeStyles()((theme: Theme) => ({
  usageSummary: {
    display: 'flex',
    width: '100%',
    gap: theme.spacing(2 * 3.75),
    margin: theme.spacing(2 * 1.5, 0),

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      gap: theme.spacing(2 * 2),
    },
  },
  stat: {
    flex: 1,
  },
}));
