import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useHeaderStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    height: 32,
    border: `1px solid ${theme.palette.background.default}`,
    borderRadius: 11,
  },
}));
