import { makeStyles } from 'tss-react/mui';

export const useProjectErrorStyles = makeStyles()(theme => ({
  root: {
    color: theme.palette.error.main,
    letterSpacing: 'unset',

    lineHeight: '140%',
  },
}));
