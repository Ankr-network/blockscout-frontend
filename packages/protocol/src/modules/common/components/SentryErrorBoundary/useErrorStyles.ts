import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useErrorStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 52,
    marginBottom: theme.spacing(2 * 2),
  },
  description: {
    fontSize: 20,
    marginBottom: theme.spacing(2 * 3.5),
  },
}));
