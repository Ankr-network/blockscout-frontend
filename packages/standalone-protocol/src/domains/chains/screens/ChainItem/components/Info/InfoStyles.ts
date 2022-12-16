import { darken, makeStyles, Theme } from '@material-ui/core';
import { ChainId } from 'domains/chains/api/chain';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    width: '100%',
    paddingTop: theme.spacing(3.5),
    textAlign: 'center',

    [`&.${ChainId.Near} $title`]: {
      color: '#668BF2',
    },

    [`&.${ChainId.Syscoin} $title`]: {
      color: '#1E41A5',
    },

    [`&.${ChainId.Moonbeam} $title`]: {
      color: '#74C8C7',
    },

    [`&.${ChainId.Ethereum} $title`]: {
      color: '#1E41A5',
    },
    [`&.${ChainId.Secret} $link`]: {
      color: theme.palette.primary.main,

      '&:hover': {
        color: darken(theme.palette.primary.main, 0.2),
      },
    },
  },
  title: {
    marginBottom: 20,
    color: theme.palette.primary.main,
  },
  link: {},
}));
