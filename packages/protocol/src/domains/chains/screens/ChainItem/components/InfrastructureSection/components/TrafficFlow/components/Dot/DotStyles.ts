import { keyframes, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useDotStyles = makeStyles()((theme: Theme) => ({
  root: {
    width: 2,
    height: 2,

    borderRadius: '50%',

    '&:nth-of-type(1)': {
      animation: `${keyframes`
        0% {
          background-color: ${theme.palette.grey[300]}
        },

        20% {
          background-color: ${theme.palette.primary.main}
        },

        100% {
          background-color: ${theme.palette.primary.main}
        },
      `} 2s infinite linear`,
    },

    '&:nth-of-type(2)': {
      animation: `${keyframes`
        0% {
          background-color: ${theme.palette.grey[300]}
        },

        20% {
          background-color: ${theme.palette.grey[300]}
        },

        40% {
          background-color: ${theme.palette.primary.main}
        },

        100% {
          background-color: ${theme.palette.primary.main}
        },
      `} 2s infinite linear`,
    },

    '&:nth-of-type(3)': {
      animation: `${keyframes`
        0% {
          background-color: ${theme.palette.grey[300]}
        },

        40% {
          background-color: ${theme.palette.grey[300]}
        },

        60% {
          background-color: ${theme.palette.primary.main}
        },

        100% {
          background-color: ${theme.palette.primary.main}
        },
      `} 2s infinite linear`,
    },

    '&:nth-of-type(4)': {
      animation: `${keyframes`
        0% {
          background-color: ${theme.palette.grey[300]}
        },

        60% {
          background-color: ${theme.palette.grey[300]}
        },

        80% {
          background-color: ${theme.palette.primary.main}
        },

        100% {
          background-color: ${theme.palette.primary.main}
        },
      `} 2s infinite linear`,
    },

    '&:nth-of-type(5)': {
      animation: `${keyframes`
        0% {
          background-color: ${theme.palette.grey[300]}
        },

        80% {
          background-color: ${theme.palette.grey[300]}
        },

        100% {
          background-color: ${theme.palette.primary.main}
        },
      `} 2s infinite linear`,
    },
  },
}));
