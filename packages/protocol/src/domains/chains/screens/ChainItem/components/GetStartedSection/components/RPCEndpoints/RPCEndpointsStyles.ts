import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useRPCEndpointsStyles = makeStyles()((theme: Theme) => ({
  rpcEndpoints: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2 * 1.75),
  },
}));
