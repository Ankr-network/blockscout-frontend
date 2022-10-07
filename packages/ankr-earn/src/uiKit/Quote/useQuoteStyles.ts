import { makeStyles } from '@material-ui/core';

export const useQuoteStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '4px auto',
    gap: theme.spacing(0, 1.5),

    '&:before': {
      content: `''`,
      width: 4,

      borderRadius: '2px',
      background: 'var(--type-color, #ccc)',
    },
  },

  error: {
    '--type-color': theme.palette.error.main,
  },

  info: {
    '--type-color': theme.palette.primary.main,
  },

  warning: {
    '--type-color': theme.palette.warning.main,
  },

  success: {
    '--type-color': theme.palette.success.main,
  },
}));
