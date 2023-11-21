import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  tool: {
    display: 'flex',
  },
  label: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(0.5, 2),
    borderRadius: 8,
  },
  circle: {
    marginRight: theme.spacing(2 * 1),
  },
}));
