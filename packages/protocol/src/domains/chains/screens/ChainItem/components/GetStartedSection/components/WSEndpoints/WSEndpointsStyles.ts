import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useWSEndpointsStyles = makeStyles()((theme: Theme) => ({
  wsEndpoints: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2 * 1.75),
  },
}));
