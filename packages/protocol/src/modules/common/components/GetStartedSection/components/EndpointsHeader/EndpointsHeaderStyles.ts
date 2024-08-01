import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useEndpointsHeaderStyles = makeStyles()((theme: Theme) => ({
  endpointsHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    color: theme.palette.text.primary,
    fontWeight: 700,
    fontSize: theme.spacing(4),
    lineHeight: theme.spacing(6),
    margin: 0,
  },
  tooltipIcon: {
    color: theme.palette.text.secondary,
    fontSize: 20,
  },
}));
