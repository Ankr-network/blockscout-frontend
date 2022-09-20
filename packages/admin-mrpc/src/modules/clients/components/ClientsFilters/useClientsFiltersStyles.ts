import { makeStyles, Theme } from '@material-ui/core/styles';

export const useClientsFiltersStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    textTransform: 'none',
    marginLeft: 10,
    borderWidth: 2,
    borderColor: theme.palette.background.default,
  },
  buttonActive: {
    borderColor: theme.palette.success.main,
  },
}));
