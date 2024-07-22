import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useEndpointsStyles = makeStyles()((theme: Theme) => ({
  endpointsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(7.5),
    minWidth: 0,
    flex: 1,

    borderRadius: theme.spacing(7.5),

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));
