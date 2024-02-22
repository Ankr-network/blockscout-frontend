import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  description: {
    letterSpacing: '0.02em',
    fontSize: 20,
    color: theme.palette.grey[800],
    marginBottom: theme.spacing(2 * 3.75),
    display: 'block',
  },
}));
