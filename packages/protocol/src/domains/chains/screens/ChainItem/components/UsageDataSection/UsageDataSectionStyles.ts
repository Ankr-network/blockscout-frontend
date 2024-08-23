import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useDataUsageSectionStyles = makeStyles()((theme: Theme) => ({
  statisticsPaper: {
    padding: theme.spacing(8),
    background: theme.palette.background.paper,

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(5.5, 4),
    },
  },
  statisticsItemTitle: {
    display: 'flex',
    marginTop: theme.spacing(5),
  },
  usageDataSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4.5),
  },
  usageSectionTitle: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
    color: theme.palette.text.primary,
    flexWrap: 'wrap',
    gap: theme.spacing(3),
  },
  privateUsageSectionTitle: {
    marginBottom: theme.spacing(5),
    paddingBottom: theme.spacing(4),
    borderBottom: `1px solid ${theme.palette.divider}`,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  usageSectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    flexWrap: 'wrap',
    width: '100%',
  },
  subchainSelectorControls: {
    marginTop: 0,
    width: '100%',
  },
  timeframeSection: {
    marginLeft: 'auto',
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
  button: {
    display: 'flex',
    gap: theme.spacing(2),
    height: 30,
    minHeight: 30,

    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  icon: {
    '& > path': {
      strokeWidth: 2,
    },
  },
}));
