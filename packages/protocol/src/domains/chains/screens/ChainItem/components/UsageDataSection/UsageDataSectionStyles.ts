import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useDataUsageSectionStyles = makeStyles()((theme: Theme) => ({
  statisticsPaper: {
    padding: theme.spacing(8),
    background: theme.palette.background.paper,
  },
  statisticsItemTitle: {
    display: 'flex',
    marginTop: theme.spacing(5),
  },
  usageDataSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(6.75),
    marginTop: theme.spacing(6),

    [theme.breakpoints.down('lg')]: {
      gap: theme.spacing(4),
      marginTop: theme.spacing(6.5),
    },
  },
  usageSectionTitle: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    color: theme.palette.text.primary,
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
    },
  },
  error: {
    background: theme.palette.background.paper,
    borderRadius: 18,
    padding: theme.spacing(6),
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
  },
}));
