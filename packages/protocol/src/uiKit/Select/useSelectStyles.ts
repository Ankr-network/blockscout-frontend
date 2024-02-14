import { makeStyles } from 'tss-react/mui';
import { selectClasses } from '@mui/material';

export const useSelectStyles = makeStyles()(theme => ({
  root: {
    borderRadius: 18,

    [`& .${selectClasses.select}`]: {
      fontSize: 14,
      fontWeight: 600,
      marginLeft: 0,
      paddingRight: `${theme.spacing(5)} !important`,
      backgroundColor: 'transparent',
    },

    '&&:hover': {
      backgroundColor: 'transparent',
    },

    '& div': {
      color: theme.palette.text.secondary,
      borderRadius: 18,

      '&.Mui-focused': {
        borderColor: 'transparent',
        color: theme.palette.text.primary,
        background: theme.palette.background.paper,
      },

      '&:hover': {
        backgroundColor: 'transparent',
        boxShadow: 'none',
      },
    },
  },
  menuPaper: {
    marginTop: theme.spacing(3.75),
    marginBottom: theme.spacing(1.25),

    boxShadow:
      '0px 0px 25px rgba(31, 34, 38, 0.1), 0px 5px 100px rgba(31, 34, 38, 0.15)',

    background: theme.palette.background.paper,

    '& li': {
      padding: theme.spacing(2),

      borderRadius: 12,
    },
  },
}));
