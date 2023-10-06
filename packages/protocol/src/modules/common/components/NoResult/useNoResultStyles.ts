import { makeStyles } from 'tss-react/mui';

export const useNoResultStyles = makeStyles()(theme => ({
  container: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: theme.spacing(7.5),

    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(20),
    },
  },
  text: {
    marginTop: theme.spacing(7.5),
    color: theme.palette.grey[300],
    fontSize: 35,
    fontWeight: 700,
  },
}));
