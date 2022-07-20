import { makeStyles } from '@material-ui/core';

export const useStakePolkadotStyles = makeStyles(theme => ({
  root: {
    minWidth: 405,
    padding: theme.spacing(5, 0),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8, 0),
    },
  },

  question: {
    margin: theme.spacing('3px', 0.625, 0.625, 0.625),
  },
  questionAmount: {
    '& > svg': {
      color: theme.palette.text.primary,
    },
  },
}));
