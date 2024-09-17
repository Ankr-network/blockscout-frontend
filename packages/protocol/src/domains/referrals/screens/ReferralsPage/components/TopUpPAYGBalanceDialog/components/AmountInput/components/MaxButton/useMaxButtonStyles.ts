import { makeStyles } from 'tss-react/mui';

const name = 'MaxButton';

export const useMaxButtonStyles = makeStyles({ name })(theme => ({
  root: {
    padding: theme.spacing(0.5, 2),
    minWidth: 'unset',
    letterSpacing: '0.01em',

    '&:focus': {
      boxShadow: 'none',
    },

    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
  },
}));
