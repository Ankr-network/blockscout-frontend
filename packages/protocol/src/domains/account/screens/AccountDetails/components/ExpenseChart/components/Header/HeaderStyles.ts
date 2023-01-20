import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: theme.spacing(2 * 1.875),
  },
  left: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(2 * 1.25),
  },
  title: {
    color: theme.palette.text.primary,

    fontWeight: 700,
    fontSize: theme.spacing(2 * 2),
    lineHeight: theme.spacing(2 * 3),
  },
  currency: {
    padding: theme.spacing(2 * 0.5, 2 * 1),

    borderRadius: 18,
    border: `1px solid ${theme.palette.action.disabledBackground}`,

    color: theme.palette.grey[600],
    letterSpacing: '0.02em',

    fontWeight: 400,
    fontSize: 11,
    lineHeight: theme.spacing(2 * 2),
  },
}));
