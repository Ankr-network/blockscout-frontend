import { makeStyles } from '@material-ui/core';

export const useUnstakeSuiStyles = makeStyles(theme => ({
  infoLabel: {
    fontSize: 14,
    fontWeight: 700,
  },

  infoValue: {
    fontSize: 16,
    fontWeight: 700,
  },

  separator: {
    marginBottom: theme.spacing(3),
  },
}));
