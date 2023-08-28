import { makeStyles } from 'tss-react/mui';

export const useFailedAddProjectContentStyles = makeStyles()(theme => ({
  description: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(8),
    lineHeight: '22.4px',
  },
  retryButton: {
    marginBottom: theme.spacing(3),
  },
  retryIcon: {
    marginRight: theme.spacing(2),
  },
}));
