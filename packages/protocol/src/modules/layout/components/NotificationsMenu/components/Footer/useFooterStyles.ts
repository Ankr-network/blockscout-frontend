import { makeStyles } from 'tss-react/mui';

export const useFooterStyles = makeStyles({ name: 'Footer' })(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3, 0),
    borderTop: `1px solid ${theme.palette.divider}`,
    height: 56,
    margin: 'auto 0',
  },
}));
