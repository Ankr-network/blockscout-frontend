import { makeStyles } from 'tss-react/mui';

export const useLabelStyles = makeStyles()(theme => ({
  root: {
    position: 'absolute',
    top: -2,
    right: 0,

    [theme.breakpoints.between('sm', 850)]: {
      display: 'none',
    },
  },
}));
