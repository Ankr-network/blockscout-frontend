import { makeStyles } from 'tss-react/mui';

export const useCostButtonStyles = makeStyles()(theme => ({
  costButton: {
    border: `2px solid ${theme.palette.grey['100']}`,
  },
}));
