import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    backgroundColor: 'transparent !important',

    '& div': {
      borderRadius: 0,

      '&:hover': {
        borderRadius: 0,
      },

      '&.Mui-focused': {
        borderRadius: 0,
      },
    },

    '&:hover': {
      '& svg': {
        color: theme.palette.primary.main,
      },
    },

    '&.Mui-focused': {
      '& svg': {
        color: `${theme.palette.text.secondary}`,
      },
    },
  },
  select: {
    padding: `3px ${theme.spacing(3)}px 0 0 !important`,

    borderRadius: 0,

    letterSpacing: '0.01em',

    fontWeight: 400,
    fontSize: 14,
    lineHeight: '20px',

    '&:hover': {
      borderRadius: 0,

      backgroundColor: 'transparent',
      color: theme.palette.primary.main,
    },

    '&:focus': {
      borderRadius: 0,

      backgroundColor: 'transparent',
    },
  },
  selectIcon: {
    top: 7,
    right: 9,
  },
  menuPaper: {
    '& li': {
      '&.Mui-selected': {
        color: theme.palette.primary.main,
      },
    },
  },
}));
