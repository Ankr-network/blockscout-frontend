import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    marginBottom: theme.spacing(3.5),
    backgroundColor: theme.palette.background.paper,
    padding: `18px ${theme.spacing(4)}px`,
    borderRadius: 18,
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',

    [theme.breakpoints.down('sm')]: {
      padding: '6px 0',
      justifyContent: 'flex-start',
    },
  },
  title: {
    marginRight: theme.spacing(1),
  },
  button: {
    [theme.breakpoints.down('sm')]: {
      '& $title': {
        fontSize: 16,
      },
    },
  },
}));
