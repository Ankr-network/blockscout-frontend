import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  mobileGroupSelector: {
    '&&': {
      backgroundColor: theme.palette.background.default,
    },

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
    padding: theme.spacing(2 * 1, 2 * 1.5, 2 * 1, 2 * 2),

    letterSpacing: '0.01em',

    fontWeight: 600,
    fontSize: theme.spacing(2 * 2),
    lineHeight: theme.spacing(2 * 3),

    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.primary.main,
    },

    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
  selectIcon: {
    top: theme.spacing(2 * 1.75),
    right: theme.spacing(2 * 1.5),
  },
  menuPaper: {
    '& li': {
      color: theme.palette.text.primary,

      fontWeight: 400,
      fontSize: theme.spacing(2 * 2),
      lineHeight: theme.spacing(2 * 3),

      '&.Mui-selected': {
        color: theme.palette.primary.main,
      },
    },
  },
}));
