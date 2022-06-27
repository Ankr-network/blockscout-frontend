import { makeStyles } from '@material-ui/core';

export const useProviderCellStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: theme.spacing(0, 1),

    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'auto 1fr',
      alignItems: 'center',
    },
  },

  info: {
    minWidth: 0,

    [theme.breakpoints.up('md')]: {
      order: 1,
    },
  },

  title: {
    marginBottom: theme.spacing(0.5),
    fontWeight: 500,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  nodes: {
    color: theme.palette.text.secondary,
  },
}));
