import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  tooltip: {
    padding: theme.spacing(2 * 2),
    margin: theme.spacing(2 * 1),
  },
}));
