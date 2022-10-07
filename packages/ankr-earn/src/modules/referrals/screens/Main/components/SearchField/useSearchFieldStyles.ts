import { makeStyles } from '@material-ui/core';

export const useSearchFieldStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    width: 463,
    padding: theme.spacing(0, 1, 0, 2),
    borderRadius: 12,
  },

  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
    backgroundColor: theme.palette.background.paper,
    border: 'none',
    color: theme.palette.text.secondary,
    fontWeight: 400,
    fontSize: 14,
  },

  btn: {
    border: 'none',
  },

  icon: {
    fontSize: 16,
  },
}));
