import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStakeDescriptionContainerStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    margin: theme.spacing(3.5, 0, 0),
    gap: theme.spacing(2, 2),

    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(6),
      gap: theme.spacing(4, 2),
    },
  },
}));
