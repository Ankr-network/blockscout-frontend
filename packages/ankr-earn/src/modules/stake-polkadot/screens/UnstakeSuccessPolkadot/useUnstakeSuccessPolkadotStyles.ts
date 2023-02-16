import { makeStyles } from '@material-ui/core';

export const useUnstakeSuccessPolkadot = makeStyles(
  ({ spacing, breakpoints }) => ({
    btn: {
      [breakpoints.up('sm')]: {
        padding: spacing(0, 12),
      },
    },
  }),
);
