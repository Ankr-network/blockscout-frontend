import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    color: `${theme.palette.primary.main} !important`,

    backgroundColor: 'transparent !important',
  },
  select: {
    padding: `3px ${theme.spacing(3)}px 0 0 !important`,

    color: `${theme.palette.primary.main} !important`,

    letterSpacing: '0.01em',

    // fontFamily: 'Inter',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '20px',

    '&:hover': {
      backgroundColor: 'transparent',
    },

    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
  selectIcon: {
    right: 9,
  },
}));
