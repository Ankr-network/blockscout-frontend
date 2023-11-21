import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useConsoleStyles = makeStyles()((theme: Theme) => ({
  console: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(7),

    padding: theme.spacing(0, 7),
  },
}));
