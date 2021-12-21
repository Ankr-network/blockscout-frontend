import { makeStyles, Theme } from '@material-ui/core';

export const useStakeContainerStyles = makeStyles<Theme>(theme => ({
  root: {
    maxWidth: 820,
    display: 'grid',
    gap: theme.spacing(3, 0),
    gridAutoRows: 'minmax(0, max-content)',

    [theme.breakpoints.up('md')]: {
      gap: theme.spacing(4, 0),
    },
  },
}));
