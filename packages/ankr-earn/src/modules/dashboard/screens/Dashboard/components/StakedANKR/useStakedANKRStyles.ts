import { makeStyles } from '@material-ui/core';

export const useStakedANKRStyles = makeStyles(theme => ({
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
