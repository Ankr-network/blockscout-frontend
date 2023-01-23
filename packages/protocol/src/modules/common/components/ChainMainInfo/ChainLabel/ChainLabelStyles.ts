import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  label: {
    fontSize: 12,
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2 * 0.5, 2 * 1),
    borderRadius: 6,
  },
}));
