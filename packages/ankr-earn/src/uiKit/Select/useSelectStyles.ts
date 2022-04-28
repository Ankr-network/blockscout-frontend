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
    fontSize: 14,
    marginTop: theme.spacing(1),
    minWidth: 100,
  },

  item: {
    fontSize: 'inherit',
    padding: theme.spacing(2, 2.5),
    color: theme.palette.text.primary,

    '&:active': {
      transform: 'translateY(0)',
      color: theme.palette.primary.main,
    },

    '&:not(:last-child)': {
      borderBottom: '1px solid #EBEDF2',
    },

    '&:hover': {
      color: theme.palette.primary.main,
      background: theme.palette.background.paper,
    },

    '&$itemSelected': {
      background: theme.palette.background.default,
      color: theme.palette.primary.main,

      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
  },

  itemSelected: {},
}));
