import { makeStyles } from 'tss-react/mui';

export const useFullApprovalAttributeStyles = makeStyles()(theme => ({
  root: {
    gap: theme.spacing(4),
  },
  content: {
    color: theme.palette.text.secondary,
  },
}));
