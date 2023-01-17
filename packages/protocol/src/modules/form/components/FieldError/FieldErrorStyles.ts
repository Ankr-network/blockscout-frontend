import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  error: {
    color: theme.palette.error.main,
    marginLeft: theme.spacing(2 * 1.5),
    marginTop: theme.spacing(2 * 0.375),
  },
}));
