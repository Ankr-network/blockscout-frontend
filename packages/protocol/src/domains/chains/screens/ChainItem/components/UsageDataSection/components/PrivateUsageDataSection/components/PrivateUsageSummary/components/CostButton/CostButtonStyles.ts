import { makeStyles } from 'tss-react/mui';

export const useCostButtonStyles = makeStyles()(() => ({
  costButton: {
    height: 'auto',
    padding: '0',
    minWidth: 'auto',
    lineHeight: '20px',

    '&:hover': {
      background: 'none',
    },
  },
}));
