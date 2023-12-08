import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useChainOverviewStyles = makeStyles()((theme: Theme) => ({
  chainOverview: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  left: {
    display: 'flex',
    gap: theme.spacing(2),

    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
    },
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  addNetworkButton: {
    '&&': {
      backgroundColor: theme.palette.background.paper,
      height: 32,
      width: 32,
      minHeight: 32,
      padding: 0,
      borderRadius: theme.spacing(3),
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
    gap: theme.spacing(2),

    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(9),
    },
  },

  top: {
    display: 'flex',
    alignItems: 'center',
  },

  coinName: {
    fontWeight: 400,
    fontSize: 16,

    marginLeft: theme.spacing(2),
  },

  archiveLabel: {
    display: 'flex',
    alignItems: 'center',

    borderRadius: theme.spacing(2),

    fontWeight: 400,
    fontSize: theme.spacing(3.5),
    lineHeight: theme.spacing(5),
  },

  docsLink: {
    height: 30,
    minHeight: 30,
    borderRadius: theme.spacing(3),
    padding: theme.spacing(0, 3),
  },
}));
