import { makeStyles } from '@material-ui/core/styles';

export const useClientsTableStyles = makeStyles(theme => ({
  row: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },
  },
}));
