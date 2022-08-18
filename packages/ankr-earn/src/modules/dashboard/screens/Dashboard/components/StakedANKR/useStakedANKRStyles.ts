import { makeStyles } from '@material-ui/core';

export const useStakedANKRStyles = makeStyles(theme => ({
  amountTitle: {
    fontSize: 14,
    lineHeight: 1,
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },

  manageButton: {
    display: 'flex',
    fontSize: 16,
    height: 44,
    width: 104,
    marginLeft: 'auto',

    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
}));
