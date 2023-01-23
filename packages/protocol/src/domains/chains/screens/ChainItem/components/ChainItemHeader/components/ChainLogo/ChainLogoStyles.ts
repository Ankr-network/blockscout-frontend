import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useChainLogoStyles = makeStyles()((theme: Theme) => ({
  chainLogo: {
    width: theme.spacing(2 * 8.5),
    height: theme.spacing(2 * 8.5),
  },
}));
