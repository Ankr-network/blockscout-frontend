import { makeStyles } from '@material-ui/core';

export const useSwapOptionsStyles = makeStyles(theme => ({
  swapChips: {
    alignItems: 'center',
    display: 'flex',
    margin: theme.spacing(6, 0),

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },

  swapChip: {
    backgroundColor: '#F2F5FA',
    fontSize: 16,
    cursor: 'pointer',

    flex: 1,
    justifyContent: 'flex-start',
    height: 80,
    padding: theme.spacing(3),
    width: '100%',
  },

  arrowIconWrapper: {
    border: '2px solid #F2F5FA',
    borderRadius: 6,
    cursor: 'pointer',

    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(2),
    height: 36,
    width: 36,
  },
}));
