import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    backgroundColor: 'transparent !important',

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

    letterSpacing: '0.01em',

    fontWeight: 600,
    fontSize: 14,
    lineHeight: '20px',

    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.primary.main,
    },

    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
  selectIcon: {
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
