import { makeStyles, Theme } from '@material-ui/core/styles';

export const useClientsTypeFiltersStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    minWidth: 0,
    textTransform: 'none',
    marginRight: 28,
    borderWidth: 2,
    borderColor: theme.palette.background.default,
    color: theme.palette.grey['600'],
    fontSize: 28,
    padding: 0,
  },
  buttonActive: {
    color: theme.palette.primary.main,
  },
}));
