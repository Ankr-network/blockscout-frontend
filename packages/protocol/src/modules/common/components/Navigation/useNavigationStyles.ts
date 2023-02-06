import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const HEADER_HEIGHT_XS = 66;
export const HEADER_HEIGHT_XL = 80;

export const useNavigationStyles = makeStyles()((theme: Theme) => ({
  skeleton: {
    height: theme.spacing(2 * 3),
    borderRadius: theme.spacing(2 * 0.75),
    margin: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
  },
}));
