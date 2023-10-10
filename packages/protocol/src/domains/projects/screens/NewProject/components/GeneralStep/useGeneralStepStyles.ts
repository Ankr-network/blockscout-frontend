import { makeStyles } from 'tss-react/mui';

export const useGeneralStepStyles = makeStyles()(theme => ({
  root: {
    maxWidth: 456,
  },
  title: {
    fontWeight: 700,
    marginBottom: theme.spacing(3),
  },
  description: {
    marginBottom: theme.spacing(3),
  },
  requireDescription: {
    marginBottom: theme.spacing(8),
    color: theme.palette.text.secondary,
    fontSize: 12,
    fontWeight: 500,
  },
}));
