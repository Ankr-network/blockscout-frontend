import { makeStyles } from 'tss-react/mui';

export const useEndpointStyles = makeStyles()(theme => ({
  copyToClip: {
    flexGrow: 1,

    height: theme.spacing(2 * 6),

    border: `2px solid ${theme.palette.background.default}`,
    borderRadius: theme.spacing(2 * 2),

    boxShadow: 'none',
  },
}));
