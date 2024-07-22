import { makeStyles } from 'tss-react/mui';

export const useMobileSideBarStyles = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(4.5),
    width: 360,
    height: '100vh',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  logo: {
    padding: theme.spacing(0, 4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  close: {
    border: 'none',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 4),
    marginTop: theme.spacing(6),
    gap: theme.spacing(1),
  },
}));
