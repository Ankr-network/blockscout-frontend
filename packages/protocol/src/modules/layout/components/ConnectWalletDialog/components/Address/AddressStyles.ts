import { makeStyles } from 'tss-react/mui';

export const useAddressStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingBottom: theme.spacing(4),

    borderBottom: `1px solid ${theme.palette.grey[100]}`,

    letterSpacing: '-0.01em',

    fontWeight: 400,
    fontSize: 16,
    lineHeight: '24px',
  },
  description: {
    color: theme.palette.grey[600],
  },
  address: {
    color: theme.palette.grey[900],
  },
}));
