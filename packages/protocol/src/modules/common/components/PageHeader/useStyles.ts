import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    marginRight: theme.spacing(2 * 1.5),
    fontSize: 16,
    color: theme.palette.text.primary,
  },
}));
