import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme, { chainId?: string }>(theme => ({
  root: {
    width: '100%',
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    textAlign: 'center',
  },
  title: {
    marginBottom: 20,
    textTransform: 'uppercase',

    [theme.breakpoints.down('sm')]: {
      fontSize: 50,
    },

    '&.solana': {
      backgroundImage: `linear-gradient(270deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%);`,
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
    },

    '&.avalanche span span': {
      color: theme.palette.primary.main,
    },
  },
  description: {
    '&.avalanche span': {
      color: theme.palette.text.primary,
    },

    '& span': {
      color: theme.palette.grey['500'],

      '& span': {
        color: theme.palette.text.primary,
      },

      '& p': {
        display: 'inline',
        textTransform: 'capitalize',
      },
    },
  },
}));
