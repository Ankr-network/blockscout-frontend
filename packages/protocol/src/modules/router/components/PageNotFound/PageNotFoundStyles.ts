import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    padding: '20vh 0',
  },

  title: {
    marginBottom: theme.spacing(2 * 2),
  },

  button: {
    minWidth: 180,
  },

  notFound: {
    fontSize: 18,
  },
}));
