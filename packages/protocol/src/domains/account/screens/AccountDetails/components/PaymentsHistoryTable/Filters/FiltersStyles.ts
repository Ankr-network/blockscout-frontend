import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    width: 370,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(1),

    '& div': {
      borderRadius: 0,
    },

    [theme.breakpoints.down('xs')]: {
      alignSelf: 'flex-end',
    },
  },
  select: {
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
  selector: {
    padding: `3px ${theme.spacing(3)}px 0 0 !important`,

    letterSpacing: '0.01em',

    fontWeight: 400,
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
