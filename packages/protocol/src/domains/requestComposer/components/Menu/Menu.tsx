import { Box, Orientation } from '@material-ui/core';
import { ILibraryTabsProps, LibraryTabs } from './LibraryTabs';
import { useMenuStyles } from './MenuStyles';

interface MenuProps extends ILibraryTabsProps {
  tabsOrientation?: Orientation;
}

export const Menu = ({ tabsOrientation, ...others }: MenuProps) => {
  const classes = useMenuStyles();

  return (
    <Box className={classes.root}>
      <LibraryTabs orientation={tabsOrientation} {...others} />
    </Box>
  );
};
