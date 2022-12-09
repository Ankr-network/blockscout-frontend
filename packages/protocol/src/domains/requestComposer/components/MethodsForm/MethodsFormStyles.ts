import { makeStyles, Theme } from '@material-ui/core/styles';

export const useEVMMethodsFormStyles = makeStyles<Theme>(theme => ({
  button: {
    marginTop: theme.spacing(3),
  },
  methodsSelect: {
    marginTop: theme.spacing(3),
  },
  argumentsTitle: {
    fontWeight: 'bold',
    marginTop: theme.spacing(3),
  },
  blockNumber: {
    marginTop: theme.spacing(1.75),
  },
  label: {
    fontWeight: 400,
    marginTop: theme.spacing(1),
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
