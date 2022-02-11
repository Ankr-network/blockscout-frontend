import { makeStyles } from '@material-ui/core';

export const useStakeDescriptionContainerStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    margin: theme.spacing(3.5, 0, 3.5, 0),
    gap: theme.spacing(2, 2),

    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(4, 0, 2, 0),
      gap: theme.spacing(4, 2),
    },
  },
}));
