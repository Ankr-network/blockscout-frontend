import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const usePricingTopUpStyles = makeStyles()((theme: Theme) => ({
  formBlockTitle: {
    marginBottom: theme.spacing(2 * 1.5),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formAmount: {
    fontSize: 14,
    fontWeight: 400,
  },
  balanceSkeleton: {
    width: 145,
    height: 24.5,
    borderRadius: 8,
  },
}));
