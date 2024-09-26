import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useNoDataStyles = makeStyles()((theme: Theme) => ({
  content: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    lineHeight: theme.spacing(6),
    fontWeight: 400,
    color: theme.palette.grey[600],
  },
}));
