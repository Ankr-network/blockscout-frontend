import { makeStyles } from 'tss-react/mui';

import { DEFAULT_MENU_PAPER_SHADOW } from 'modules/common/styles/const';

export const useSignupMenuStyles = makeStyles()(() => ({
  paper: {
    width: 400,
    borderRadius: 14,
    boxShadow: DEFAULT_MENU_PAPER_SHADOW,
  },
  menu: {
    padding: 0,

    '& li:active': {
      transform: `translateY(0)`,
    },
  },
}));
