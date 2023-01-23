import { keyframes, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { mainTheme } from 'uiKit/Theme/mainTheme';

const firstDotAmimation = keyframes`
  0% {
    background-color: ${mainTheme.palette.grey[300]}
  },

  20% {
    background-color: ${mainTheme.palette.primary.main}
  },

  100% {
    background-color: ${mainTheme.palette.primary.main}
  },
`;

const secondDotAmimation = keyframes`
  0% {
    background-color: ${mainTheme.palette.grey[300]}
  },

  20% {
    background-color: ${mainTheme.palette.grey[300]}
  },

  40% {
    background-color: ${mainTheme.palette.primary.main}
  },

  100% {
    background-color: ${mainTheme.palette.primary.main}
  },
`;

const thirdDotAmimation = keyframes`
  0% {
    background-color: ${mainTheme.palette.grey[300]}
  },

  40% {
    background-color: ${mainTheme.palette.grey[300]}
  },

  60% {
    background-color: ${mainTheme.palette.primary.main}
  },

  100% {
    background-color: ${mainTheme.palette.primary.main}
  },
`;

const fourthDotAmimation = keyframes`
  0% {
    background-color: ${mainTheme.palette.grey[300]}
  },

  60% {
    background-color: ${mainTheme.palette.grey[300]}
  },

  80% {
    background-color: ${mainTheme.palette.primary.main}
  },

  100% {
    background-color: ${mainTheme.palette.primary.main}
  },
`;

const fifthDotAmimation = keyframes`
  0% {
    background-color: ${mainTheme.palette.grey[300]}
  },

  80% {
    background-color: ${mainTheme.palette.grey[300]}
  },

  100% {
    background-color: ${mainTheme.palette.primary.main}
  },
`;

export const useStyles = makeStyles()((theme: Theme) => ({
  trafficFlowRoot: {
    display: 'flex',
    justifyContent: 'space-between',

    marginTop: theme.spacing(2 * 3.2),

    padding: theme.spacing(2 * 3, 2 * 3.75),

    borderRadius: theme.spacing(2 * 3),

    backgroundColor: theme.palette.grey[100],

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
    lineHeight: theme.spacing(2 * 2.5),
  },
  learnMoreButton: {
    height: 'auto',
    padding: 0,

    backgroundColor: 'transparent',
    minHeight: 20,
    fontSize: 14,

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
    lineHeight: theme.spacing(2 * 2.5),
  },
  separator: {
    display: 'flex',
    gap: theme.spacing(2 * 0.5),

    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
  },
  dot: {
    width: 2,
    height: 2,

    borderRadius: '50%',

    '&:nth-of-type(1)': {
      animation: `${firstDotAmimation} 2s infinite linear`,
    },

    '&:nth-of-type(2)': {
      animation: `${secondDotAmimation} 2s infinite linear`,
    },

    '&:nth-of-type(3)': {
      animation: `${thirdDotAmimation} 2s infinite linear`,
    },

    '&:nth-of-type(4)': {
      animation: `${fourthDotAmimation} 2s infinite linear`,
    },

    '&:nth-of-type(5)': {
      animation: `${fifthDotAmimation} 2s infinite linear`,
    },
  },
}));
