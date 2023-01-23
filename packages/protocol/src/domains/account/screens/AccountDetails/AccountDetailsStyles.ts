import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const ACCOUNT_MAX_WIDTH = 1050;
const TOP1_WIDTH = 465;

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 940,
    marginLeft: 'auto',
    marginRight: 'auto',

    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(2 * 3.5),
    },
  },
  top: {
    gap: theme.spacing(2 * 1.5, 2 * 3),
    display: 'flex',
    [`@media (max-width:${ACCOUNT_MAX_WIDTH}px)`]: {
      flexDirection: 'column',
    },
  },
  top1column: {
    display: 'flex',
    flexDirection: 'column',
    width: `calc(100% - ${TOP1_WIDTH}px)`,
    gap: theme.spacing(2 * 3),
    [`@media (max-width:${ACCOUNT_MAX_WIDTH}px)`]: {
      width: 'unset',
      gap: theme.spacing(2 * 1.5),
    },
  },
  topUp: {
    flex: 1,
    minWidth: 460,
    minHeight: 356,
    [`@media (max-width:${ACCOUNT_MAX_WIDTH}px)`]: {
      minWidth: 'unset',
      minHeight: 'unset',
    },
  },
  payments: {
    marginTop: theme.spacing(2 * 5),

    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(2 * 4),
    },
  },
  expenseChart: {
    marginTop: theme.spacing(2 * 5.25),

    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
    },
  },
}));
