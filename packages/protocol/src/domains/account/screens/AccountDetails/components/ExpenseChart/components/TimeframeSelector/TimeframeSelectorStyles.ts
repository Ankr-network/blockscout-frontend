import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    backgroundColor: 'transparent',

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
      backgroundColor: theme.palette.common.white,
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
    '&&': {
      padding: theme.spacing(0, 2 * 4, 0, 0),
    },

    borderRadius: 0,

    letterSpacing: '0.01em',

    fontWeight: 400,
    fontSize: 14,
    lineHeight: theme.spacing(2 * 2.5),

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
