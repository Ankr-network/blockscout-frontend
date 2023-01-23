import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  inputRow: {
    display: 'flex',
    gridGap: theme.spacing(2 * 1.5),

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  emailTextfieldWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 'auto',
  },
  emailTextfield: {
    flex: 'auto',
  },
  emailInputRoot: {
    borderRadius: 17,
    height: 48,
    padding: 0,
    '&& input': {
      height: '100%',
      borderRadius: 17,
      marginLeft: 0,
      padding: theme.spacing(0, 2 * 2),
    },
  },
  submitButton: {
    borderRadius: 17,
    minWidth: 103,
  },
}));
