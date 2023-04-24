import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useRateBlockStyles = makeStyles()((theme: Theme) => ({
  rate: {
    fontSize: 14,
    fontWeight: 400,
    marginBottom: theme.spacing(2 * 0.5),
    display: 'block',
    height: theme.spacing(8),

    [theme.breakpoints.down('sm')]: {
      order: 1,
      width: '100%',
    },
  },
  skeleton: {
    height: theme.spacing(8),
    marginTop: theme.spacing(2 * -0.875),
    width: '60%',
    margin: 'auto',
    borderRadius: theme.spacing(2 * 1),
  },
}));
