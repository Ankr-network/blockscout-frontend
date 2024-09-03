import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
  title: {
    color: theme.palette.text.primary,

    fontWeight: 700,
    fontSize: theme.spacing(2 * 2),
    lineHeight: theme.spacing(2 * 3),
  },
  switcher: {
    '&&&': {
      border: `2px solid ${theme.palette.grey[300]}`,
    },
  },
}));
