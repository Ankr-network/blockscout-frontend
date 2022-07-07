import { makeStyles } from '@material-ui/core';

export const useStakeFormStyles = makeStyles(() => ({
  box: {
    position: 'relative',
  },

  periodLabel: {
    display: 'flex',
    alignItems: 'center',
  },

  stakeBtn: {
    borderRadius: 16,
  },
}));
