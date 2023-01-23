import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

export const useNotificationStyles = makeStyles()((theme: Theme) => ({
  root: {
    '& a': {
      textDecoration: 'underline',
    },
    '& div:last-child': {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
    },
    '& button': {
      borderColor: theme.palette.common.white,
      borderRadius: '50%',
      width: '60%',
      height: '60%',
    },
    '& button:hover': {
      backgroundColor: 'transparent',
      borderColor: theme.palette.common.white,
    },
    '& svg': {
      fill: theme.palette.common.white,
    },
  },
}));
