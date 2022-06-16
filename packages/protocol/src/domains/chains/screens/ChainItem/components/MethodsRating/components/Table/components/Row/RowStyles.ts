import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  rowRoot: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),
  },
  request: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,

    maxWidth: theme.spacing(40.625),

    color: theme.palette.text.primary,

    letterSpacing: '0.01em',

    fontWeight: 400,
    fontSize: theme.spacing(1.75),
    lineHeight: `${theme.spacing(2)}px`,
  },
  diagram: {
    width: `calc(100% - ${theme.spacing(40.625)}px - ${theme.spacing(3)}px)`,

    '& > div': {
      height: 6,

      borderRadius: theme.spacing(0.5),

      backgroundColor: theme.palette.action.disabledBackground,
    },
  },
}));
