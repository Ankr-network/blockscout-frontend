import { makeStyles } from 'tss-react/mui';

import { NARROW_TWO_COLUMN_WIDTH, ONE_ROW_SCREEN_WIDTH } from '../../const';

export const useHeaderStyles = makeStyles()(theme => ({
  information: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',

    [theme.breakpoints.down(NARROW_TWO_COLUMN_WIDTH)]: {
      flexDirection: 'column',
      gap: theme.spacing(3.5),
    },
  },
  title: {
    color: theme.palette.text.primary,
    marginRight: theme.spacing(1),
  },
  infotitle: {
    display: 'flex',
    gap: theme.spacing(10),
    marginLeft: theme.spacing(3),
    [theme.breakpoints.down(NARROW_TWO_COLUMN_WIDTH)]: {
      marginLeft: 0,
    },
    [theme.breakpoints.down(ONE_ROW_SCREEN_WIDTH)]: {
      flexDirection: 'column',
      gap: theme.spacing(4),
    },
  },
  text: {
    color: theme.palette.grey[600],
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 400,
    marginLeft: theme.spacing(3),
  },
  info: {
    fontSize: 20,
    lineHeight: '28px',
    fontWeight: 700,
    color: theme.palette.grey[900],
    marginLeft: theme.spacing(3),
    [theme.breakpoints.down(NARROW_TWO_COLUMN_WIDTH)]: {
      fontSize: 16,
      lineHeight: '24px',
    },
  },
}));
