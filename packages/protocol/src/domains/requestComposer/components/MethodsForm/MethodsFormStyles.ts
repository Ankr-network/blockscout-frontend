import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useEVMMethodsFormStyles = makeStyles()((theme: Theme) => ({
  button: {
    marginTop: theme.spacing(2 * 3),
  },
  methodsSelect: {
    marginTop: theme.spacing(2 * 3),
  },
  argumentsTitle: {
    fontWeight: 'bold',
    marginTop: theme.spacing(2 * 3),
  },
  blockNumber: {
    marginTop: theme.spacing(2 * 1.75),
  },
  label: {
    fontSize: 14,
    fontWeight: 400,
    marginTop: theme.spacing(2 * 1),
  },
  checkboxLabel: {
    fontSize: 14,
  },
  selectField: {
    '& div': {
      '&:hover': {
        borderColor: theme.palette.background.default,
      },

      '&.Mui-focused': {
        borderColor: theme.palette.background.default,
      },
    },
  },
}));
