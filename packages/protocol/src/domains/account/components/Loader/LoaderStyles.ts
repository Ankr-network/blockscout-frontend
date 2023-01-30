import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useLoaderStyles = makeStyles()((theme: Theme) => ({
  root: {
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    background: theme.palette.background.paper,
    padding: theme.spacing(2 * 5),
    maxWidth: 480,
    minHeight: 486,
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  spinnerContainer: {
    position: 'relative',
    marginTop: theme.spacing(2 * 4.5),
  },
}));
