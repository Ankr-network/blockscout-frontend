import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  endpointUrlsRoot: {
    display: 'flex',
    flexDirection: 'column',

    gap: theme.spacing(2),
  },
  endpoint: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: theme.spacing(2),

    paddingBottom: theme.spacing(3),

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(0, 1fr))',
    },
  },
}));
