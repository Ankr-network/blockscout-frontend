import { makeStyles } from 'tss-react/mui';

export const useAddProjectButtonStyles = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    height: theme.spacing(12),

    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
  },
}));
