import { makeStyles } from '@material-ui/core';

export const useAssetsListStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gap: theme.spacing(3, 0),
  },
}));
