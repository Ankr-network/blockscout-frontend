import { makeStyles } from 'tss-react/mui';

import { DEFAULT_MENU_PAPER_SHADOW } from 'modules/common/styles/const';

export const useAddWhitelistMenuStyles = makeStyles<boolean>()(
  (theme, hasBottomLocation) => ({
    paper: {
      width: 193,
      marginTop: hasBottomLocation ? theme.spacing(2) : 0,
      padding: theme.spacing(1),

      borderRadius: 17,

      boxShadow: DEFAULT_MENU_PAPER_SHADOW,

      transform: 'translateY(12px)',
    },
  }),
);
