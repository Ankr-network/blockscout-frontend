import { makeStyles, Theme } from '@material-ui/core/styles';

import { TabsManagerGapSize, TabsManagerStylesProps } from './TabsManagerTypes';

const desktopGapSizeToTabMarginMap: Record<TabsManagerGapSize, number> = {
  [TabsManagerGapSize.DEFAULT]: 30 / 2,
};

const mobileGapSizeToTabMarginMap: Record<TabsManagerGapSize, number> = {
  [TabsManagerGapSize.DEFAULT]: 12 / 2,
};

export const useStyles = makeStyles<Theme, TabsManagerStylesProps>(theme => ({
  root: {},
  tabs: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 10,
  },
  right: {
    display: 'flex',
    alignItems: 'center',
  },
  tab: ({ gapSize }) => ({
    margin: `0 ${desktopGapSizeToTabMarginMap[gapSize]}px`,

    cursor: 'pointer',

    '&:last-child': {
      marginRight: 0,
    },

    [theme.breakpoints.down('xs')]: {
      margin: `0 ${mobileGapSizeToTabMarginMap[gapSize]}`,
    },
  }),
  content: {},
}));

export const useOverridingStyles = makeStyles<Theme, TabsManagerStylesProps>(
  theme => ({
    titleTab: {
      marginLeft: 0,

      cursor: 'default',
    },
    selectedTab: ({ gapSize }) => ({
      margin: `0 ${desktopGapSizeToTabMarginMap[gapSize] - 9}px`,

      [theme.breakpoints.down('xs')]: {
        margin: `0 ${mobileGapSizeToTabMarginMap[gapSize] - 6}`,
      },
    }),
    disabledTab: {
      cursor: 'default',
    },
  }),
);
