import { makeStyles } from 'tss-react/mui';

export const useLastUserRequestsStyles = makeStyles()(theme => ({
  root: {
    overflow: 'hidden',

    minWidth: '65%',

    borderRadius: 20,

    backgroundColor: theme.palette.background.paper,

    [theme.breakpoints.down('md')]: {
      minWidth: '60%',
    },

    [theme.breakpoints.down('sm')]: {
      flexGrow: 1,

      minWidth: '100%',
      minHeight: 300,
    },
  },
  header: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(6, 7, 0),

    fontSize: 16,
    fontWeight: 700,
  },
}));
