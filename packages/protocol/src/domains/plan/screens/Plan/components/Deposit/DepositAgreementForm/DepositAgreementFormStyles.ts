import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useDepositAgreementFormStyles = makeStyles<Theme>(theme => ({
  agreementText: {
    '&': {
      display: 'inline-flex',
      paddingLeft: theme.spacing(1),
      lineHeight: 1.5,
    },
  },
  buttonWrapper: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: 210,
    },
  },
}));
