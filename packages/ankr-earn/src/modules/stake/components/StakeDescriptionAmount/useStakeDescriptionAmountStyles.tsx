import { makeStyles } from '@material-ui/core';

export const useStakeDescriptionValueStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    fontSize: 16,
  },

  title: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    marginRight: '0.3em',
    maxWidth: 100,

    [theme.breakpoints.up('md')]: {
      maxWidth: 240,
    },
  },

  titleSkeleton: {
    display: 'inline-flex',
    marginRight: '0.5em',
  },
}));
