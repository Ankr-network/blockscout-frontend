import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    width: '100%',
    paddingTop: theme.spacing(3.5),
    textAlign: 'center',

    '&.near $title': {
      color: '#668BF2',
    },
    '&.moonbeam $title': {
      color: '#74C8C7',
    },
  },
  title: {
    marginBottom: 20,
    color: theme.palette.primary.main,
  },
}));
