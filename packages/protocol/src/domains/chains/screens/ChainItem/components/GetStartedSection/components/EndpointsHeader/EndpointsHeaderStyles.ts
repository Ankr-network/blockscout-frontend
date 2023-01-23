import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useEndpointsHeaderStyles = makeStyles()((theme: Theme) => ({
  endpointsHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2 * 1),

    color: theme.palette.text.primary,

    fontWeight: 700,
    fontSize: theme.spacing(2 * 2),
    lineHeight: theme.spacing(2 * 3),
  },
}));
