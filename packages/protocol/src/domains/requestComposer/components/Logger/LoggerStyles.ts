import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useLoggerStyles = makeStyles()((theme: Theme) => ({
  logger: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2 * 3.5),

    height: theme.spacing(2 * 75.5),
    padding: theme.spacing(2 * 3.5, 0, 2 * 3.5),

    borderRadius: theme.spacing(2 * 2.5),

    background: theme.palette.grey[800],
    width: '60%',
  },
}));
