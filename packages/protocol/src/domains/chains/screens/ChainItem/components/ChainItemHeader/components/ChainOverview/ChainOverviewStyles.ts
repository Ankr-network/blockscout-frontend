import { Theme, makeStyles } from '@material-ui/core';

export const useChainOverviewStyles = makeStyles<Theme>(theme => ({
  chainOverview: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  right: {
    display: 'flex',
    gap: theme.spacing(2),
  },
  description: {
    margin: 0,
  },
  chainDocsLink: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));
