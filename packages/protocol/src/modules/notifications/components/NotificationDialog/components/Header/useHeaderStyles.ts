import { makeStyles } from 'tss-react/mui';

const name = 'Header';

export const useHeaderStyles = makeStyles({ name })(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(3),

    width: '100%',
    paddingBottom: theme.spacing(4),

    borderBottom: `1px solid ${theme.palette.divider}`,

    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(10),
    },
  },
  title: {
    maxWidth: 400,

    textAlign: 'center',
  },
  subtitle: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
}));
