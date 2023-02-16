import { makeStyles } from 'tss-react/mui';

import { premiumText } from 'uiKit/Theme/themeUtils';

export const useLinksStyles = makeStyles<void, 'copyItem'>()(
  (theme, _params, classes) => ({
    root: {
      width: '100%',

      [`& .${classes.copyItem}:not(:last-child)`]: {
        marginBottom: theme.spacing(3),
      },
    },
    premiumOnlyContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

      padding: theme.spacing(1.5, 2.5),

      borderRadius: theme.spacing(3),

      background: theme.palette.background.default,
    },
    premiumOnlyText: {
      display: 'inline',

      width: 'fit-content',

      background: premiumText,

      fontSize: 12,

      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    premiumOnlyIcon: {
      color: theme.palette.grey[600],
    },
    copyItem: {
      boxShadow: `0 0 0 2px ${theme.palette.background.default}`,
    },
  }),
);
