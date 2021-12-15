import { lighten, makeStyles, Theme } from '@material-ui/core';

export const useSelectStyles = makeStyles<Theme>(theme => ({
  root: {
    borderRadius: 18,

    '& svg': {
      transition: '0.2s all',
    },
  },

  selectRoot: {
    borderRadius: 18,
  },

  // do not delete as this class is used below
  selectDisabled: {},

  selectRootOutlined: {
    color: theme.palette.text.secondary,
    border: `1px solid ${lighten(theme.palette.text.secondary, 0.7)}`,
    background: 'none',

    '&:hover': {
      background: theme.palette.background.paper,
      borderColor: theme.palette.background.paper,
    },

    '&$selectDisabled': {
      border: `1px solid ${lighten(theme.palette.text.secondary, 0.7)}`,
      background: 'none',
    },
  },

  selectRootFilled: {
    border: `2px solid ${theme.palette.background.default}`,

    '&:hover': {
      background: 'none',
    },

    '&$selectDisabled': {
      background: theme.palette.background.default,
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
    background: theme.palette.background.paper,
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
        background: theme.palette.background.paper,
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
