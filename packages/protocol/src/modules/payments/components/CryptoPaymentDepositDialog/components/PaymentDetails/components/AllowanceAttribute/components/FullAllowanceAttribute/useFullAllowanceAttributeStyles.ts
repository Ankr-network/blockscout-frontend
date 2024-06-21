import { makeStyles } from 'tss-react/mui';

export const useFullAllowanceAttributeStyles = makeStyles()(theme => ({
  root: {
    gap: theme.spacing(4),
  },
  content: {
    color: theme.palette.text.secondary,
  },
}));
