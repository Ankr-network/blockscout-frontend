import { makeStyles } from 'tss-react/mui';

export const useBlueDotStyles = makeStyles()(theme => ({
  root: {
    width: theme.spacing(3),
    height: theme.spacing(3),

    borderRadius: '50%',

    backgroundColor: theme.palette.primary.main,
  },
}));
