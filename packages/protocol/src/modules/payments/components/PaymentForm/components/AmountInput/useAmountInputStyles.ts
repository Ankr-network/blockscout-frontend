import { inputBaseClasses } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useAmountInputStyles = makeStyles()(theme => ({
  amountInputRoot: {
    [`.${inputBaseClasses.root}`]: {
      padding: theme.spacing(0, 4),
    },
  },
}));
