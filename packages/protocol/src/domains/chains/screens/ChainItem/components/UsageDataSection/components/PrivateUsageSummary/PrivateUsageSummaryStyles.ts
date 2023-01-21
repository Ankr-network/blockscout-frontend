import { makeStyles, Theme } from '@material-ui/core';

export const useUsageSummaryStyles = makeStyles<Theme>(theme => ({
  usageSummary: {
    display: 'flex',
    flexDirection: 'column',

    width: '100%',
    padding: theme.spacing(2, 2.75),

    borderRadius: 24,

    backgroundColor: theme.palette.common.white,
  },
  stat: {
    flex: 1,
  },
}));
