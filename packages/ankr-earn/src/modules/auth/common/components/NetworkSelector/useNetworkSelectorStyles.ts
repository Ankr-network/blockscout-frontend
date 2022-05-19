import { alpha, makeStyles, Theme } from '@material-ui/core';

export const useNetworkSelectorStyles = makeStyles<Theme>(theme => ({
  list: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    margin: theme.spacing(-2, -2, 0),
  },

  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    padding: theme.spacing(0, 2),
    width: '100%',
    maxWidth: 120 + theme.spacing(4),
  },

  item: {
    padding: theme.spacing(1.5, 1, 1),

    border: 'none',
    background: 'none',
    textAlign: 'center',
    color: theme.palette.text.primary,

    borderRadius: 8,
  },

  itemClickable: {
    transition: 'background 0.2s',
    cursor: 'pointer',

    '&:hover': {
      background: alpha(theme.palette.text.primary, 0.03),
    },
  },

  itemTitle: {
    marginTop: theme.spacing(1),
  },
}));
