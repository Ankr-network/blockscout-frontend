import { makeStyles } from '@material-ui/core';

export const useNotMigratedANKRStyles = makeStyles(theme => ({
  infoIcon: {
    fontSize: 24,
    width: '1em',
    height: '1em',
    flexShrink: 0,
    marginRight: theme.spacing(1),
  },

  infoTitle: {
    marginBottom: theme.spacing(0.25),
    fontSize: 14,
    fontWeight: 600,
  },

  infoDescription: {
    fontSize: 14,
    fontWeight: 400,
  },

  migrateButton: {
    fontSize: 16,

    [theme.breakpoints.up('lg')]: {
      width: 130,
    },
  },
}));
