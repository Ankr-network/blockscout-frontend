import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 940,
    marginLeft: 'auto',
    marginRight: 'auto',

    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(3.5),
    },
  },
  top: {
    gap: theme.spacing(1.5, 3),
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',

    '@media (max-width:870px)': {
      gridTemplateColumns: '1fr',
    },
  },
  top1column: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
  payments: {
    marginTop: theme.spacing(5),

    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(4),
    },
  },
  expenseChart: {
    marginTop: theme.spacing(5.25),

    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
    },
  },
}));
