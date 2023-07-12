import { makeStyles } from 'tss-react/mui';

export const useActiveLabelStyles = makeStyles()(theme => ({
  root: {
    fontSize: 14,
    lineHeight: 1.4,
    color: theme.palette.success.main,
    padding: theme.spacing(0.5, 2),
    backgroundColor: theme.palette.success.light,
    borderRadius: theme.spacing(2),
  },
}));
