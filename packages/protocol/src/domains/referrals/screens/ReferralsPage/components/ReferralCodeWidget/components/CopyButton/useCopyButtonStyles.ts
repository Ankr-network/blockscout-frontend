import { makeStyles } from 'tss-react/mui';

export const useCopyButtonStyles = makeStyles()(theme => ({
  button: {
    width: 32,
    minWidth: 'unset',

    '&:focus': {
      boxShadow: 'none',
    },

    [theme.breakpoints.down('sm')]: {
      width: 24,
    },
  },
}));
