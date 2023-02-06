import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useChainsItemLinkStyles = makeStyles()((theme: Theme) => ({
  dummy: {
    background: theme.palette.background.default,
    minHeight: 36,
    borderRadius: 6,
    fontSize: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
