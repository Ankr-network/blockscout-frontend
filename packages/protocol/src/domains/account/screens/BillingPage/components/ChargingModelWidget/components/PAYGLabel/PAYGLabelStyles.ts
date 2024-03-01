import { makeStyles } from 'tss-react/mui';

export const usePAYGLabelStyles = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(1, 2.5),
    borderRadius: 12,
    backgroundColor: theme.palette.background.default,
  },
  smallRoot: {
    padding: theme.spacing(0.5, 1),
    borderRadius: 8,
  },
}));
