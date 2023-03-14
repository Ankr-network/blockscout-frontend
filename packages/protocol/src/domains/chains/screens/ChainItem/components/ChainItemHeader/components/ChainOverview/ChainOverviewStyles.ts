import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useChainOverviewStyles = makeStyles()((theme: Theme) => ({
  chainOverview: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  left: {
    display: 'flex',
    gap: theme.spacing(2 * 2),

    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
    },
  },
  description: {
    margin: 0,
  },

  addNetworkButton: {
    minWidth: 'auto',
    whiteSpace: 'nowrap',
    padding: theme.spacing(0, 2 * 1.5),

    '&&': {
      backgroundColor: theme.palette.background.paper,
    },
    display: 'flex',
    borderRadius: theme.spacing(2 * 2),

    '&:hover': {
      '&&': {
        backgroundColor: theme.palette.background.default,
      },
    },

    [theme.breakpoints.up('lg')]: {
      flexShrink: 0,
      '&&': {
        padding: theme.spacing(2 * 1.5, 2 * 3),
      },
    },
  },
  right: {
    display: 'flex',
    gap: theme.spacing(3),

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      marginTop: theme.spacing(2 * 4.5),
      gap: theme.spacing(3.5),
    },
  },
}));
