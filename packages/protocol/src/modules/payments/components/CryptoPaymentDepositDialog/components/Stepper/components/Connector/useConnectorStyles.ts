import { stepConnectorClasses } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useConnectorStyles = makeStyles()(theme => ({
  root: {
    top: 14,
    right: 'calc(50% + 16px)',
    left: 'calc(-50% + 16px)',
  },
  disabled: {
    right: 'calc(50% + 13px)',
    left: 'calc(-50% + 13px)',
  },
  completed: {
    [`&& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.divider,
    },
  },
  line: {
    backgroundColor: theme.palette.divider,
  },
}));
