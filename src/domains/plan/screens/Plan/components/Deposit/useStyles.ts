import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(7.5, 15, 7.5, 10.5),
    borderRadius: 18,
  },
  left: {
    paddingRight: theme.spacing(10),
    width: '50%',
  },
  info: {
    fontWeight: 500,

    '&:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },
  divider: {
    margin: theme.spacing(2.5, 0),
  },
}));
