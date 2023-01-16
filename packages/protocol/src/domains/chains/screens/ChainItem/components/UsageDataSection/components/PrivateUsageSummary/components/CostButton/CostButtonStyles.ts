import { makeStyles, Theme } from '@material-ui/core/styles';

export const useCostButtonStyles = makeStyles<Theme>(() => ({
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
