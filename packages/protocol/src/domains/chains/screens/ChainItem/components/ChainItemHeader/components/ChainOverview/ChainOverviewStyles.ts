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
    },
    display: 'flex',

    '&:hover': {
      '&&': {
        backgroundColor: theme.palette.background.default,
      },
    },

    [theme.breakpoints.up('lg')]: {
      flexShrink: 0,
      '&&': {
        padding: theme.spacing(3, 6),
      },
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
    height: 28,
    minHeight: 28,
    position: 'relative',
    top: 2,
  },
}));
