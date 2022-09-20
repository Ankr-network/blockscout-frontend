import { makeStyles, Theme } from '@material-ui/core/styles';

export const useClientsTableStyles = makeStyles((theme: Theme) => ({
  row: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },
  },
}));
