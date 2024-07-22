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
      height: 40,
      width: 40,
      minHeight: 40,
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
    gap: theme.spacing(3),

    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(9),
    },
  },

  top: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(0, 0, 1, 0),
  },

  coinName: {
    fontWeight: 400,
    fontSize: 16,
    display: 'flex',
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
    margin: theme.spacing(0.5, 0, 0, 0),
    height: 36,
    minHeight: 36,
    borderRadius: theme.spacing(3),
    padding: theme.spacing(2, 4, 2, 3),
    gap: 8,
  },

  chips: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  premiumChip: {
    height: 24,
    display: 'flex',
    alignItems: 'center',
  },
  dot: {
    display: 'flex',
    alignItems: 'center',
    '&::after': {
      marginLeft: theme.spacing(1),
      content: '""',
      width: 2,
      height: 2,
      borderRadius: '50%',
      backgroundColor: theme.palette.text.secondary,
    },
  },
}));
