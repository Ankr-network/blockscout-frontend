import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 22,
  },
  subtitle: {
    fontSize: 14,
  },
  label: {
    marginLeft: theme.spacing(2 * 1),
    border: '1px solid rgba(31, 34, 38, 0.1)',
    borderRadius: 18,
    lineHeight: 1,
    padding: theme.spacing(2 * 0.5, 2 * 0.75),
  },
}));
