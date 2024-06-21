import { makeStyles } from 'tss-react/mui';

export const useAddressDetailsStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    gap: theme.spacing(6),
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    flexGrow: 1,
  },
  label: {
    color: theme.palette.grey[900],
  },
  addressBoxRoot: {
    height: 52,
    maxHeight: 'unset',
    padding: 0,

    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,

    backgroundColor: 'transparent',

    borderRadius: 0,
  },
}));
