import { makeStyles } from '@material-ui/core';

export const useAddTokensStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    justifyContent: 'start',
    gridTemplateColumns: 'repeat(auto-fill, minmax(124px, 1fr))',
    gap: theme.spacing(1.25, 2),

    [theme.breakpoints.up('md')]: {
      gap: theme.spacing(1.5, 1.5),
    },
  },
}));
