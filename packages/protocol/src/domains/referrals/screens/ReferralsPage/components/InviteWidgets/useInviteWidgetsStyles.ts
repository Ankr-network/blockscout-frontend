import { makeStyles } from 'tss-react/mui';

const name = 'InviteWidgets';

export const useInviteWidgetsStyles = makeStyles({ name })(theme => ({
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(7.5),

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: theme.spacing(2),
    },
  },
}));
