import { makeStyles } from '@material-ui/core';

export const useBalancesCardStyles = makeStyles(theme => ({
  root: {
    borderRadius: 12,
  },

  header: {
    padding: theme.spacing(1, 2),
    borderBottom: '1px solid #E2E8F3',
  },

  body: {
    padding: theme.spacing(0, 2),
  },

  item: {
    padding: theme.spacing(1.5, 0),

    '&:nth-child(n+2)': {
      borderTop: '1px solid #E2E8F3',
    },
  },

  title: {
    fontSize: 14,
    fontWeight: 700,
    color: theme.palette.text.secondary,
  },
}));
