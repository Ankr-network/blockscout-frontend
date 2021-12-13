import { makeStyles, Theme } from '@material-ui/core';

export const useStakeBtnStyles = makeStyles<Theme>(theme => ({
  noPrimaryBtnScale: {
    '&:before': {
      display: 'none',
    },

    '&:hover': {
      background: theme.palette.primary.light,
    },
  },
}));
