import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useMainNavigationStyles = makeStyles()((theme: Theme) => ({
  root: {
    height: '100%',
    position: 'relative',
  },
  tip: {
    fontSize: 12,
    fontWeight: 700,
    color: theme.palette.grey[500],
    margin: theme.spacing(3),
    display: 'block',
  },
  setting: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
}));
