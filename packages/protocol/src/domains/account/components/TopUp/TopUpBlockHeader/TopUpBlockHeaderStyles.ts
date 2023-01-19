import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useTopUpBlockHeaderStyles = makeStyles()((theme: Theme) => ({
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2 * 2),
  },
  title: {
    fontSize: 14,
    fontWeight: 700,
    lineHeight: theme.spacing(2 * 3.25),
  },
  link: {
    fontSize: 14,
    height: 'auto',
    padding: '0',
    minWidth: 'auto',
    lineHeight: theme.spacing(2 * 3.25),
    '&:hover': {
      color: theme.palette.grey[900],
      backgroundColor: 'transparent',
    },
  },
}));
