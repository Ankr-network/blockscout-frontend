import { makeStyles } from 'tss-react/mui';

export const useActionButtonStyles = makeStyles()(theme => ({
  button: {
    fontSize: 20,
    lineHeight: '28px',
    height: theme.spacing(15),
    borderRadius: 20,
    marginTop: theme.spacing(16),

    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(6),
    },
  },
  currentPlanButton: {
    color: theme.palette.grey[400],
  },
  freeButton: {
    backgroundColor: theme.palette.background.paper,
  },
}));
