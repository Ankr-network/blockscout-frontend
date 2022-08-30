import { Theme, makeStyles } from '@material-ui/core';

export const usePlaceholderStyles = makeStyles<Theme>(theme => ({
  placeholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',
    height: '100%',
  },
  title: {
    marginBottom: theme.spacing(2.5),

    color: theme.palette.text.primary,
    letterSpacing: '-0.01em',

    fontWeight: 700,
    fontSize: theme.spacing(3),
    lineHeight: `${theme.spacing(4)}px`,
  },
  subtitle: {
    maxWidth: theme.spacing(71.875),

    color: theme.palette.grey[600],
    letterSpacing: '0.01em',
    textAlign: 'center',

    fontWeight: 400,
    fontSize: theme.spacing(1.75),
    lineHeight: `${theme.spacing(2.5)}px`,
  },
}));
