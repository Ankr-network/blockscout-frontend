import { makeStyles } from 'tss-react/mui';

import { TELEGRAM_COLOR } from 'modules/common/constants/const';

export const useMessengersBlockStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 424,

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
    borderTop: `1px solid ${theme.palette.divider}`,
    [`&:last-of-type`]: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
  name: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  tgIcon: {
    color: TELEGRAM_COLOR,
  },
}));
