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
      background: theme.palette.primary.main,
    },
  },
}));
