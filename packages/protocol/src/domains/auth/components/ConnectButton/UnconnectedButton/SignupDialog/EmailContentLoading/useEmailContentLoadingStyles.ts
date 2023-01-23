import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useEmailContentLoadingStyles = makeStyles()((theme: Theme) => ({
  root: {
    textAlign: 'center',
  },
  title: {
    marginTop: theme.spacing(2 * 1.5),
    marginBottom: theme.spacing(2 * 1.5),
    fontSize: 28,
  },
}));
