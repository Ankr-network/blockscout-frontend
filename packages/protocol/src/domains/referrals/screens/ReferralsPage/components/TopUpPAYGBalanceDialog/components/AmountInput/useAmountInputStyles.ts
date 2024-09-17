import { boxClasses, typographyClasses } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const name = 'AmountInput';

export const useAmountInputStyles = makeStyles({ name })(theme => ({
  root: {
    width: '100%',
  },
  inputRoot: {
    paddingLeft: theme.spacing(4),
  },
  label: {
    [`>.${boxClasses.root}`]: {
      [`>.${typographyClasses.root}`]: {
        width: '100%',
      },
    },
  },
}));
