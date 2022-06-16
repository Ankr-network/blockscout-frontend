import { makeStyles, Theme } from '@material-ui/core';

export const useChainsStyles = makeStyles<Theme>(theme => ({
  title: {
    marginBottom: 30,
  },
  blockList: {
    display: 'grid',
    gap: 28,
    alignItems: 'center',
    gridTemplateColumns: 'repeat(3, 1fr)',
    marginBottom: 46,
  },
  userStats: {
    marginBottom: theme.spacing(5.25),
  },
}));
