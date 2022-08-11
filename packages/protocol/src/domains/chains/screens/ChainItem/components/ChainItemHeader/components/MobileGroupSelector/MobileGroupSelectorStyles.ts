import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  mobileGroupSelector: {
    backgroundColor: `${theme.palette.background.default} !important`,

    '& div': {
      color: theme.palette.text.primary,
    },

    '&.Mui-focused': {
      '& svg': {
        color: `${theme.palette.grey[600]}`,
      },
    },
  },
  select: {
    padding: `${theme.spacing(1)}px ${theme.spacing(1.5)}px ${theme.spacing(
      1,
    )}px ${theme.spacing(2)}px`,

    letterSpacing: '0.01em',

    fontWeight: 600,
    fontSize: theme.spacing(2),
    lineHeight: `${theme.spacing(3)}px`,

    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.primary.main,
    },

    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
  selectIcon: {
    top: theme.spacing(1.75),
    right: theme.spacing(1.5),
  },
  menuPaper: {
    '& li': {
      color: theme.palette.text.primary,

      fontWeight: 400,
      fontSize: theme.spacing(2),
      lineHeight: `${theme.spacing(3)}px`,

      '&.Mui-selected': {
        color: theme.palette.primary.main,
      },
    },
  },
}));
