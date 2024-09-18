import { makeStyles } from 'tss-react/mui';

export const useActionButtonStyles = makeStyles()(theme => ({
  button: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '24px',
    height: theme.spacing(10),
    borderRadius: 8,
  },
  currentPlanButton: {
    color: theme.palette.grey[400],
  },
  freeButton: {
    color: theme.palette.primary.main,
    '&&': {
      backgroundColor: theme.palette.background.paper,
    },
  },
}));
