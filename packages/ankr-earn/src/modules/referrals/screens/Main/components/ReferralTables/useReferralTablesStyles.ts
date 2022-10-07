import { makeStyles } from '@material-ui/core';

export const useReferralTablesStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(6),
  },
}));
