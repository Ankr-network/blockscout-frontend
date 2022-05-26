import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  trafficFlowRoot: {
    display: 'flex',
    justifyContent: 'space-between',

    marginTop: theme.spacing(3.2),

    padding: `${theme.spacing(3)}px 30px`,

    borderRadius: theme.spacing(3),

    backgroundColor: '#E7EBF3',

    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
      gap: 18,
    },
  },
  left: {
    display: 'flex',
    gap: 9,
  },
  title: {
    letterSpacing: '0.01em',

    fontWeight: 700,
    fontSize: 14,
    lineHeight: '20px',
  },
  learnMoreButton: {
    height: 'auto',
    padding: 0,

    backgroundColor: 'transparent',

    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,

    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 9,
    },
  },
  flowItem: {
    color: theme.palette.grey[600],

    letterSpacing: '0.01em',

    fontWeight: 700,
    fontSize: 14,
    lineHeight: '20px',
  },
  separator: {
    display: 'flex',
    gap: theme.spacing(0.5),

    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
  },
  dot: {
    width: 2,
    height: 2,

    borderRadius: '50%',

    '&:nth-child(1)': {
      animation: '$first-dot-amimation 2s infinite linear',
    },

    '&:nth-child(2)': {
      animation: '$second-dot-amimation 2s infinite linear',
    },

    '&:nth-child(3)': {
      animation: '$third-dot-amimation 2s infinite linear',
    },

    '&:nth-child(4)': {
      animation: '$fourth-dot-amimation 2s infinite linear',
    },

    '&:nth-child(5)': {
      animation: '$fifth-dot-amimation 2s infinite linear',
    },
  },

  '@keyframes first-dot-amimation': {
    '0%': {
      backgroundColor: '#BFC6D0',
    },

    '20%': {
      backgroundColor: theme.palette.primary.main,
    },

    '100%': {
      backgroundColor: theme.palette.primary.main,
    },
  },

  '@keyframes second-dot-amimation': {
    '0%': {
      backgroundColor: '#BFC6D0',
    },

    '20%': {
      backgroundColor: '#BFC6D0',
    },

    '40%': {
      backgroundColor: theme.palette.primary.main,
    },

    '100%': {
      backgroundColor: theme.palette.primary.main,
    },
  },

  '@keyframes third-dot-amimation': {
    '0%': {
      backgroundColor: '#BFC6D0',
    },

    '40%': {
      backgroundColor: '#BFC6D0',
    },

    '60%': {
      backgroundColor: theme.palette.primary.main,
    },

    '100%': {
      backgroundColor: theme.palette.primary.main,
    },
  },

  '@keyframes fourth-dot-amimation': {
    '0%': {
      backgroundColor: '#BFC6D0',
    },

    '60%': {
      backgroundColor: '#BFC6D0',
    },

    '80%': {
      backgroundColor: theme.palette.primary.main,
    },

    '100%': {
      backgroundColor: theme.palette.primary.main,
    },
  },

  '@keyframes fifth-dot-amimation': {
    '0%': {
      backgroundColor: '#BFC6D0',
    },

    '80%': {
      backgroundColor: '#BFC6D0',
    },

    '100%': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));
