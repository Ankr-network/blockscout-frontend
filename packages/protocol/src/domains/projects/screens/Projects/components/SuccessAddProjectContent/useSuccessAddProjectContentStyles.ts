import { makeStyles } from 'tss-react/mui';

export const useSuccessAddProjectContentStyles = makeStyles()(theme => ({
  description: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(8),
    lineHeight: '22.4px',
  },
  configureButton: {
    marginBottom: theme.spacing(3),
  },
}));
