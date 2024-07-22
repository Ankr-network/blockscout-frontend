import { makeStyles } from 'tss-react/mui';

import { TabSize } from 'modules/common/components/SecondaryTab';

const getTabSizeBorderRadius = (tabSize: TabSize) => {
  switch (tabSize) {
    case TabSize.Medium:
      return 16;
    default:
    case TabSize.Small:
      return 10;
    case TabSize.ExtraSmall:
      return 10;
    case TabSize.Smallest:
      return 10;
  }
};

export const useTimeframeTabsStyles = makeStyles<TabSize>()(
  (theme, tabSize) => ({
    timeframeTabs: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: theme.spacing(0.5),
      border: `2px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.grey[100],

      '&&': {
        borderRadius: getTabSizeBorderRadius(tabSize),
      },
    },
    tab: {
      flexGrow: 1,
    },
  }),
);
