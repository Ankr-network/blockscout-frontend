import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useEndpointsStyles = makeStyles()((theme: Theme) => ({
  endpointsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2 * 3.75),
    minWidth: 0,
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: theme.spacing(8),

    borderRadius: theme.spacing(2 * 3.75),

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));
