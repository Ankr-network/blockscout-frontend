import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(3),
  },
  manager: {
    justifyContent: 'center',

    '& > div': {
      backgroundColor: theme.palette.grey['400'],
      borderRadius: 16,
      padding: 3,

      '& > div': {
        width: 'calc(50% - 4px)',
      },
    },
  },

  button: {
    backgroundColor: theme.palette.grey['400'],
    padding: theme.spacing(1.5, 8),
    textTransform: 'inherit',

    '&&': {
      borderRadius: 14,
    },

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1.5, 2),
    },
  },
}));
