import { makeStyles } from 'tss-react/mui';

export const useSubmitButtonStyles = makeStyles()(theme => ({
  root: {
    height: theme.spacing(12),
    width: '100%',

    '&:hover': {
      color: theme.palette.common.white,
    },
  },
}));
