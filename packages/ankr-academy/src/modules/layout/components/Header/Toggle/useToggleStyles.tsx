import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { defaultTheme } from 'ui';

export const useToggleStyles = makeStyles<Theme>(theme => ({
  component: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    width: 32,
    height: 32,
    alignSelf: 'center',
    background: 'none',

    '& span': {
      display: 'flex',
      flexDirection: 'column',
    },

    '&:hover': {
      background: 'none',
    },

    '&:hover $line': {
      background: defaultTheme.palette.primary.main,
    },
  },
  componentOpened: {
    '& $top': {
      transform: 'translateY(4px) rotate(45deg)',
    },
    '& $bottom': {
      transform: 'translateY(-5px) rotate(-45deg)',
    },
  },
  line: {
    width: '100%',
    height: 2,
    transitionTimingFunction: 'linear',
    transitionDuration: '250ms',
    transitionProperty: 'transform',
    transformOrigin: 'center',
    transition: '0.2s background',
    background: defaultTheme.palette.text.secondary,
  },
  top: {
    marginBottom: theme.spacing(0.75),
  },
}));
