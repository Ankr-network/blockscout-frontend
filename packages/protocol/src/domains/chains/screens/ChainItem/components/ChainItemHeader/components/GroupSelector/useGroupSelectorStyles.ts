import { makeStyles } from 'tss-react/mui';

export const useGroupSelectorStyles = makeStyles()(theme => ({
  groupSelectorRoot: {
    '&&': {
      width: 'fit-content',
      height: 32,

      backgroundColor: theme.palette.background.default,

      boxShadow: 'none',

      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
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
    '&&': {
      display: 'flex',
      alignItems: 'center',

      width: 'unset',
      color: theme.palette.text.secondary,

      fontSize: 14,
      fontWeight: 500,
      lineHeight: '143%',
    },

    padding: theme.spacing(2, 3, 2, 4),

    letterSpacing: '0.01em',

    '&:hover': {
      color: theme.palette.text.primary,
    },

    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
  selectIcon: {
    top: theme.spacing(3.5),
    right: theme.spacing(3),
  },
  menuPaper: {
    '& li': {
      color: theme.palette.text.primary,

      fontWeight: 400,
      fontSize: theme.spacing(4),
      lineHeight: theme.spacing(6),

      '&.Mui-selected': {
        color: theme.palette.primary.main,
      },
    },
  },
}));
