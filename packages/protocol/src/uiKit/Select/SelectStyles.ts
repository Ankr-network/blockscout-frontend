import { selectClasses } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    borderRadius: 18,
    height: 34,

    [`& .${selectClasses.select}`]: {
      fontSize: 14,
      fontWeight: 600,
      marginLeft: 0,
      paddingRight: `${theme.spacing(2 * 2.5)} !important`,
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
    fontSize: 16,
    marginTop: theme.spacing(2 * 1.875),
    marginBottom: theme.spacing(2 * 0.625),
    borderRadius: 21,
    boxShadow:
      '0px 0px 25px rgba(31, 34, 38, 0.1), 0px 5px 100px rgba(31, 34, 38, 0.15)',
    background: theme.palette.background.paper,

    '& ul': {
      paddingTop: theme.spacing(2 * 0.375),
      paddingBottom: theme.spacing(2 * 0.375),
      paddingRight: theme.spacing(2 * 2.5),
      paddingLeft: theme.spacing(2 * 2.5),
    },

    '& li': {
      fontSize: 'inherit',
      paddingRight: 0,
      paddingLeft: 0,
      paddingTop: theme.spacing(2 * 2),
      paddingBottom: theme.spacing(2 * 2),

      '&:active': {
        transform: 'translateY(0)',
      },

      '&:not(:last-child)': {
        borderBottom: `1px solid ${theme.palette.grey[100]}`,
      },

      '&:hover': {
        color: theme.palette.primary.main,
        background: theme.palette.background.paper,
      },

      '&.Mui-selected': {
        color: theme.palette.primary.main,
        background: 'none',
        backgroundColor: 'transparent !important',

        '&:hover': {
          background: 'none',
        },
      },
    },
  },
}));
