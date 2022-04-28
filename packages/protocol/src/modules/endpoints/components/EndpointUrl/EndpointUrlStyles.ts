import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  endpointUrlRoot: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',

    width: '100%',
  },
  copyToClip: {
    width: '100%',
  },
}));
