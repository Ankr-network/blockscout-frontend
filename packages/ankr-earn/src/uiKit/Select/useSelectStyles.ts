import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    borderRadius: 18,

    '& svg': {
      transition: '0.2s all',
    },

    '& > div': {
      color: theme.palette.text.secondary,
      borderRadius: 18,

      '&:hover': {
        background: 'none',
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
      },

      '&:focused': {
        background: 'none',
      },
    },
  },
  select: {
    '&&': {
      paddingRight: theme.spacing(4.75),
      background: 'none',
    },
  },
  menuPaper: {
    fontSize: 16,
    marginTop: theme.spacing(1),
    borderRadius: theme.spacing(1),
    border: '1px solid #E2E7F0',
    background: theme.palette.background.default,
    minWidth: 100,

    '& ul': {
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
      paddingRight: theme.spacing(2.5),
      paddingLeft: theme.spacing(2.5),
    },

    '& li': {
      fontSize: 'inherit',
      paddingRight: 0,
      paddingLeft: 0,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      color: theme.palette.text.secondary,

      '&:active': {
        transform: 'translateY(0)',
      },

      '&:not(:last-child)': {
        borderBottom: '1px solid #EBEDF2',
      },

      '&:hover': {
        color: theme.palette.primary.main,
        background: theme.palette.background.default,
      },

      '&.Mui-selected': {
        background: 'none',
        color: theme.palette.text.primary,

        '&:hover': {
          background: 'none',
          color: theme.palette.text.primary,
        },
      },
    },
  },
}));
