import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  menuButton: {
    padding: theme.spacing(1.25, 1.5),
    color: theme.palette.text.primary,
    backgroundColor: '#E7EBF3',
    fontWeight: 'bold',
    marginLeft: 'auto',
  },
  button: {
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      border: '2px solid rgba(31, 34, 38, 0.1)',
    },
  },
}));
