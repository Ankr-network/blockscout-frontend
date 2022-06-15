import { makeStyles, Theme } from '@material-ui/core';

export const useBigNavStyles = makeStyles<Theme>(theme => ({
  root: {},

  list: {
    display: 'flex',
    flexFlow: 'row nowrap',
    margin: theme.spacing(0, 0, -1.5),
    padding: theme.spacing(0, 0, 1.5),
    listStyle: 'none',
    overflow: 'hidden',
    overflowX: 'auto',
  },

  item: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    maxWidth: '100%',
    flex: '0 0 auto',

    '&:first-child': {
      paddingLeft: 0,
    },

    '&:last-child': {
      paddingRight: 0,
    },
  },
}));
