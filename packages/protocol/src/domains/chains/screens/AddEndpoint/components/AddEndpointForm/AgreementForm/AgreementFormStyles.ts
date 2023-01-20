import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2 * 3.5),
  },
  checkbox: {
    width: '60%',
  },
  agreementText: {
    '&': {
      display: 'inline-flex',
      paddingLeft: theme.spacing(2 * 1),
      lineHeight: 1.5,
    },
  },
  buttonWrapper: {
    width: '40%',
    textAlign: 'right',
  },
  button: {
    maxWidth: 295,
  },
}));
