import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useDataUsageSectionStyles = makeStyles()((theme: Theme) => ({
  usageDataSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2 * 3.75),

    marginTop: theme.spacing(2 * 3.75),

    [theme.breakpoints.down('lg')]: {
      gap: theme.spacing(2 * 2),

      marginTop: theme.spacing(2 * 3.5),
    },
  },
  row: {
    display: 'flex',
    gap: 20,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  timeframe: {
    '&&': {
      display: 'none',

      [theme.breakpoints.down('md')]: {
        display: 'flex',
      },
    },
  },
  error: {
    background: theme.palette.background.paper,
    borderRadius: 18,
    padding: theme.spacing(2 * 3),
    marginTop: theme.spacing(2 * 3),
    marginBottom: theme.spacing(2 * 3),
  },
}));
