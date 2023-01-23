import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  userStats: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2 * 3),
    marginBottom: theme.spacing(2 * 5.25),
  },
}));
