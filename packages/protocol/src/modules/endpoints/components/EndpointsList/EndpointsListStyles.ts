import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  endpointsListRoot: {
    display: 'flex',
    flexDirection: 'column',

    gap: theme.spacing(2.25),

    marginTop: 37,
  },
  group: {
    '&:not(:last-child)': {
      borderBottom: `2px solid ${theme.palette.background.default}`,
    },
  },
  header: {
    paddingBottom: theme.spacing(2.25),

    color: theme.palette.action.disabledBackground,
  },
  title: {
    color: theme.palette.text.primary,

    letterSpacing: '0.01em',

    fontWeight: 700,
    fontSize: theme.spacing(1.75),
    lineHeight: `${theme.spacing(2.5)}px`,
  },
}));
