import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  headerRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: theme.spacing(3.25),
  },
  titleBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
  },
  title: {
    letterSpacing: '0.01em',

    color: theme.palette.text.primary,

    fontWeight: 700,
    fontSize: theme.spacing(1.75),
    lineHeight: `${theme.spacing(2.5)}px`,
  },
  periodToggler: {
    margin: 0,
  },
  tabs: {
    margin: 0,
  },
}));
