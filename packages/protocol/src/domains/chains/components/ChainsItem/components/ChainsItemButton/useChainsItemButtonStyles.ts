import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useChainsItemButtonStyles = makeStyles()((theme: Theme) => ({
  buttonAddNetwork: {
    marginRight: theme.spacing(2 * 1),
    backgroundColor: 'transparent',
  },
}));
