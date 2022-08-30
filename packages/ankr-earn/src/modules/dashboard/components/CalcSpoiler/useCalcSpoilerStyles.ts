import { darken, makeStyles } from '@material-ui/core';

export const useCalcSpoilerStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',

    '&:before': {
      [theme.breakpoints.up('md')]: {
        position: 'relative',
        top: theme.spacing(3),

        content: `''`,
        display: 'block',
        width: '100%',
        height: 1,
        background: darken(theme.palette.background.default, 0.05),
      },
    },
  },

  buttonWrapper: {
    width: '100%',

    [theme.breakpoints.up('md')]: {
      maxWidth: 220 + theme.spacing(2.5) * 2,
      position: 'relative',
      padding: theme.spacing(0, 2.5),
      backgroundColor: theme.palette.background.paper,
    },
  },

  buttonIcon: {
    '& > *:first-child': {
      fontSize: 14,
    },
  },

  bodyWrapper: {
    overflow: 'hidden',
    height: 0,
    transition: 'height 0.2s',
  },

  bodyWrapperActive: {
    overflow: 'visible',
    height: 'auto',
  },

  body: {
    transition: 'opacity 0.2s 0.1s',
    opacity: 0,
    padding: theme.spacing(5, 0, 0),
  },

  bodyActive: {
    opacity: 1,
  },
}));
