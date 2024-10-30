import { makeStyles } from 'tss-react/mui';

import { DEFAULT_MENU_PAPER_SHADOW } from 'modules/common/styles/const';

export const useNotificationsMenuStyles = makeStyles()(theme => ({
  paper: {
    borderRadius: 16,
    boxShadow: DEFAULT_MENU_PAPER_SHADOW,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),

    '&&&': {
      padding: 0,
    },
  },
  paperRoot: {
    // backgroundColor: 'red',
  },
  root: {
    width: 460,
    minHeight: 520,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
  },
}));
