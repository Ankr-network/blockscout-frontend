import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const SIDEBAR_WIDTH = 220;

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    position: 'fixed',

    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2 * 5),

    width: SIDEBAR_WIDTH,
    height: '100%',
    padding: theme.spacing(2 * 4, 2 * 2),

    backgroundColor: theme.palette.background.paper,
  },
}));
