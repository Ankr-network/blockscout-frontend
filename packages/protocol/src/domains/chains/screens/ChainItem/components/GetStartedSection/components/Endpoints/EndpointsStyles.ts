import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useEndpointsStyles = makeStyles()((theme: Theme) => ({
  endpointsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2 * 3.75),

    borderRadius: theme.spacing(2 * 3.75),
  },
}));
