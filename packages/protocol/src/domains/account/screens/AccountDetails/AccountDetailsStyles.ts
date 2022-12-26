import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const MAX_WIDTH = 1050;

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
    display: 'flex',
    [`@media (max-width:${MAX_WIDTH}px)`]: {
      flexDirection: 'column',
    },
  },
  top1column: {
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100% - 465px)',
    gap: theme.spacing(3),
    [`@media (max-width:${MAX_WIDTH}px)`]: {
      width: 'unset',
      gap: theme.spacing(1.5),
    },
  },
  topUp: {
    flex: 1,
    minWidth: 460,
    [`@media (max-width:${MAX_WIDTH}px)`]: {
      minWidth: 'unset',
    },
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
