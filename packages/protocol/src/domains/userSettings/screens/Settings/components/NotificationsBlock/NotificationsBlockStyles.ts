import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    padding: theme.spacing(2 * 4),
    marginTop: theme.spacing(2 * 4),
    borderRadius: 30,
  },
  title: {
    marginBottom: theme.spacing(2 * 3),
    fontSize: 20,
  },
}));
