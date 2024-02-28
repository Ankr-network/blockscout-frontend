import { makeStyles } from 'tss-react/mui';

export const usePAYGLabelStyles = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(1, 2.5),

    borderRadius: 12,

    backgroundColor: theme.palette.background.default,

    letterSpacing: '-0.01em',

    fontSize: 16,
    fontWeight: 400,
    lineHeight: '140%',

    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
}));
