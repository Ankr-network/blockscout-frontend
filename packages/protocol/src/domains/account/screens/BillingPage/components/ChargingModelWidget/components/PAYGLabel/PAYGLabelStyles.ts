import { makeStyles } from 'tss-react/mui';

export const usePAYGLabelStyles = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(1, 2.5),
    borderRadius: 12,
    backgroundColor: theme.palette.background.default,
    whiteSpace: 'nowrap',
  },
  smallRoot: {
    padding: theme.spacing(0.5, 1),
    borderRadius: 8,
  },
  mediumRoot: {
    padding: theme.spacing(0.5, 2),
    borderRadius: 8,
  },
}));
