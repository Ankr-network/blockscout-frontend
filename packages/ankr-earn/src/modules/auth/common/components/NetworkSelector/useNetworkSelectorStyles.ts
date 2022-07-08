import { alpha, makeStyles, Theme } from '@material-ui/core';

interface INetworkSelectorStylesProps {
  direction?: 'row' | 'column';
}

export const useNetworkSelectorStyles = makeStyles<
  Theme,
  INetworkSelectorStylesProps
>(theme => ({
  list: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    flexDirection: ({ direction }: INetworkSelectorStylesProps) =>
      direction || 'row',
    alignItems: 'baseline',
    margin: theme.spacing(-2, 0, 0),
  },

  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    width: '100%',
  },

  oldItem: {
    padding: theme.spacing(1.5, 1, 1),

    border: 'none',
    background: 'none',
    textAlign: 'center',
    color: theme.palette.text.primary,

    borderRadius: 8,
  },

  item: {
    padding: theme.spacing(1.5, 1, 1),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',

    border: `2px solid ${theme.palette.background.default}`,
    background: 'none',
    textAlign: 'center',
    color: theme.palette.text.primary,

    borderRadius: 16,

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(1.5, 2.5),
    },
  },

  itemClickable: {
    transition: 'background 0.2s',
    cursor: 'pointer',

    '&:hover': {
      background: alpha(theme.palette.text.primary, 0.03),
    },
  },

  itemTitle: {
    marginLeft: theme.spacing(1),
  },

  connect: {
    marginRight: theme.spacing(1),
    fontWeight: 700,
    color: theme.palette.primary.main,
  },

  icon: {
    fontSize: 36,
    width: '1em',
    height: '1em',
  },
}));
