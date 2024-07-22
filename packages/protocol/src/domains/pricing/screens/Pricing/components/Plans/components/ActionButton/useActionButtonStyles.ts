import { makeStyles } from 'tss-react/mui';

export const useActionButtonStyles = makeStyles()(theme => ({
  button: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '24px',
    height: theme.spacing(12),
    borderRadius: 16,
    marginTop: theme.spacing(12),

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
