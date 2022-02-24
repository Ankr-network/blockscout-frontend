import { makeStyles, Theme } from '@material-ui/core/styles';

interface SpinnerStyleProps {
  size: number;
}

export const useStyles = makeStyles<Theme, SpinnerStyleProps>(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: ({ size }) => size,
    height: ({ size }) => size,
    borderRadius: '50%',
    margin: 2.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    animation: '$color 1.5s infinite ease-out',
    backgroundColor: theme.palette.action.disabledBackground,
  },
  circle2: {
    animationDelay: '0.5s',
  },
  circle3: {
    animationDelay: '1s',
  },

  '@keyframes color': {
    '0%': {
      backgroundColor: theme.palette.primary.main,
    },
    '100%': {
      backgroundColor: theme.palette.action.disabledBackground,
    },
  },
  centered: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
}));
