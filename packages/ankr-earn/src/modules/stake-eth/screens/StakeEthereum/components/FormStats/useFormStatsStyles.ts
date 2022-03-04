import { makeStyles } from '@material-ui/core';

export const useFormStatsStyles = makeStyles(() => ({
  questionBtn: {
    margin: 5,
  },

  link: {
    padding: 0,
    height: 'auto',

    '&:hover': {
      background: 'none',
    },
  },
}));
