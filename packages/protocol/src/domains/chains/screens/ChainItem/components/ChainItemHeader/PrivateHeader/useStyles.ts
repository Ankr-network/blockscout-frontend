import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    paddingTop: theme.spacing(1),
  },
  text: {
    fontWeight: 600,
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    display: 'flex',
    alignItems: 'center',

    '& >:not(:last-child)': {
      marginRight: theme.spacing(2.5),
    },
  },
  bottom: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(0, 2),

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },

    '& $copyToClip:not(:last-child)': {
      [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(2.5),
      },
    },
  },
  copyToClip: { flex: 1, maxWidth: '100%', minWidth: 0 },
  preloaderWrapper: {
    minHeight: 120,
    position: 'relative',
  },
}));
