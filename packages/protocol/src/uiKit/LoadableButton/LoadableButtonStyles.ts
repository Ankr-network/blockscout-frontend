import { Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  hidden: {
    visibility: 'hidden',
  },
  loaderWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  downLoader: {
    '&&': {
      position: 'absolute',
      color: theme.palette.grey[300],
    },
  },
}));
