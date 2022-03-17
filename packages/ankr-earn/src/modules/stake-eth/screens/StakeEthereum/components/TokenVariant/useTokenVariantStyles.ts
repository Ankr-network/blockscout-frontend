import { makeStyles } from '@material-ui/core';

export const useTokenVariantStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.primary,
    fontWeight: 'normal',
    height: '100%',
    padding: theme.spacing(3, 2.5),
    alignItems: 'flex-start',
  },

  active: {
    backgroundColor: theme.palette.background.default,
    cursor: 'default',
    color: theme.palette.text.primary,

    '&:active': {
      transform: 'none',
    },
  },

  label: {
    display: 'block',
    whiteSpace: 'normal',
    textAlign: 'left',
  },

  icon: {
    marginRight: theme.spacing(1),
  },
}));
