import { makeStyles, Theme } from '@material-ui/core';

export const useSelectStyles = makeStyles<Theme>(theme => ({
  root: {
    background: theme.palette.background.default,
    border: 'none',
    borderRadius: 18,

    '& div': {
      borderRadius: 18,
      border: 'none',
    },
  },
  menuPaper: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 21,
    boxShadow:
      '0px 0px 25px rgba(31, 34, 38, 0.1), 0px 5px 100px rgba(31, 34, 38, 0.15)',

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
        background: '#fff',
      },

      '&.Mui-selected': {
        color: '#ccc',
        background: 'none',
        cursor: 'default',

        '&:hover': {
          background: 'none',
        },
      },
    },
  },
}));
