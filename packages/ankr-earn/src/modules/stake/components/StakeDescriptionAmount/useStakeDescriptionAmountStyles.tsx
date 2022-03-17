import { makeStyles } from '@material-ui/core';

export const useStakeDescriptionValueStyles = makeStyles(theme => ({
  root: {
    fontSize: 16,
    cursor: 'help',
  },

  title: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    marginRight: '0.3em',
    maxWidth: 100,

    [theme.breakpoints.up('md')]: {
      maxWidth: 200,
    },
  },
}));
