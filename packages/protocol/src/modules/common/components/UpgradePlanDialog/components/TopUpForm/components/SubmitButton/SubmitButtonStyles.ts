import { makeStyles } from 'tss-react/mui';

export const useSubmitButtonStyles = makeStyles()(theme => ({
  root: {
    height: theme.spacing(12),
    width: '100%',

    [theme.breakpoints.down('sm')]: {
      maxWidth: 86,
    },

    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%',
    },

    '&:hover': {
      color: theme.palette.common.white,
    },
  },
}));
