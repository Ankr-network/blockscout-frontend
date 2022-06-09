import { makeStyles, Theme } from '@material-ui/core';

export const useFooterStyles = makeStyles<Theme>(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(2.5, 5),

    [theme.breakpoints.up('xl')]: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr 1fr',
    },
  },

  center: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  rightSide: {
    justifyContent: 'end',

    [theme.breakpoints.up('xl')]: {
      marginRight: theme.spacing(9),
    },
  },

  leftSide: {
    justifyContent: 'start',
  },
}));
