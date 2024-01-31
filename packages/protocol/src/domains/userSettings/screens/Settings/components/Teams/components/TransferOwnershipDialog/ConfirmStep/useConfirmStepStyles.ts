import { makeStyles } from 'tss-react/mui';

export const useConfirmStepStyles = makeStyles()(theme => ({
  description: {
    marginBottom: theme.spacing(6),
    color: theme.palette.text.secondary,
  },
}));
