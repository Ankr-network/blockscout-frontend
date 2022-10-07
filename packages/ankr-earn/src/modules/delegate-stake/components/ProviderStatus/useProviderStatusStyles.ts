import { makeStyles } from '@material-ui/core';

export const useProviderStatusStyles = makeStyles(theme => ({
  status: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
  },

  statusDotIcon: {
    '&:before': {
      content: `''`,
      width: '1em',
      height: '1em',
      fontSize: 8,
      borderRadius: '50%',
      background: 'currentColor',
    },
  },

  statusWithTooltip: {
    '&:before': {
      transition: '0.2s',
    },

    '& svg': {
      transition: '0.2s',
    },

    '&:hover': {
      '&:before': {
        transform: 'scale(1.5)',
      },

      '& svg': {
        transform: 'scale(1.2)',
      },
    },
  },

  clockIcon: {},

  green: {
    color: theme.palette.success.main,
  },

  red: {
    color: theme.palette.error.main,
  },

  statsTooltip: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: theme.spacing(1, 1),
    margin: 0,
  },

  statsTitle: {},

  statsDescr: {
    margin: 0,
  },
}));
