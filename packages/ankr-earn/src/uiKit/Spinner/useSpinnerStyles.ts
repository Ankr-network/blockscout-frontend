import { makeStyles, Theme } from '@material-ui/core/styles';

interface SpinnerStyleProps {
  size: number;
}

export const useSpinnerStyles = makeStyles<Theme, SpinnerStyleProps>(theme => ({
  root: {
    animationName: '$spin',
    animationDuration: '1s',
    animationDelay: '0s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
    willChange: 'transform',
    margin: 'auto',
    width: ({ size }) => size,
    height: ({ size }) => size,
    color: theme.palette.primary.main,
  },
  '@keyframes spin': {
    '100%': { transform: 'rotate(360deg)' },
  },
  centered: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
}));
