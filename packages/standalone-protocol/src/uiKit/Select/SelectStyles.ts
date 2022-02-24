import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    borderRadius: 18,

    '& div': {
      color: theme.palette.text.secondary,
      borderRadius: 18,

      '&.Mui-focused': {
        borderColor: 'transparent',
        color: theme.palette.text.primary,
        background: theme.palette.background.default,
      },

      '&:hover': {
        borderColor: 'transparent',
      },
    },
  },
  menuPaper: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 21,
    boxShadow:
      '0px 0px 25px rgba(31, 34, 38, 0.1), 0px 5px 100px rgba(31, 34, 38, 0.15)',
    background: theme.palette.background.default,

    '& ul': {
      paddingTop: 3,
      paddingBottom: 3,
      paddingRight: theme.spacing(2.5),
      paddingLeft: theme.spacing(2.5),
    },

    '& li': {
      fontSize: 'inherit',
      paddingRight: 0,
      paddingLeft: 0,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),

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
        color: theme.palette.action.disabledBackground,
        background: 'none',
        cursor: 'default',

        '&:hover': {
          background: 'none',
        },
      },
    },
  },
}));
