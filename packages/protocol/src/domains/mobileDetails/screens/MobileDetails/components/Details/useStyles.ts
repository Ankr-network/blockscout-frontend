import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    padding: theme.spacing(2 * 16, 0, 0),
  },
  info: {
    maxWidth: 250,
    margin: 'auto',
  },
  navigation: {
    margin: theme.spacing(2 * 7, 0, 2 * 8),
  },
  switcher: {
    maxWidth: '100%',
  },
}));
