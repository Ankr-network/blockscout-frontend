import { makeStyles } from 'tss-react/mui';

export const useNoDataGuardStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    height: '100%',

    color: theme.palette.grey[600],

    fontWeight: 400,
    lineHeight: theme.spacing(6),
  },
}));
