import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useChainOverviewStyles = makeStyles()((theme: Theme) => ({
  chainOverview: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  left: {
    display: 'flex',
    gap: theme.spacing(2),

    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
    },
  },
  addNetworkButton: {
    '&&': {
      backgroundColor: theme.palette.background.paper,
      height: 43,
      width: 43,
      minHeight: 43,
      padding: 0,
      borderRadius: theme.spacing(3),
      marginTop: theme.spacing(-0.25),
    },
    display: 'flex',

    '&:hover': {
      '&&': {
        backgroundColor: theme.palette.background.default,
      },
    },

    [theme.breakpoints.up('lg')]: {
      flexShrink: 0,
    },
  },
  right: {
    display: 'flex',
    gap: theme.spacing(3),

    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(3),
    },
  },
  docsLink: {
    gap: 8,
  },
}));
