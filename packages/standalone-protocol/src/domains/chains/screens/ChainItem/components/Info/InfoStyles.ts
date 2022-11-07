import { darken, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    width: '100%',
    paddingTop: theme.spacing(3.5),
    textAlign: 'center',

    '&.near $title': {
      color: '#668BF2',
    },

    '&.syscoin $title': {
      color: '#1E41A5',
    },
    '&.moonbeam $title': {
      color: '#74C8C7',
    },
    '&.eth $title': {
      color: '#1E41A5',
    },
    '&.secret $link': {
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
