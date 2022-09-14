import { Box } from '@material-ui/core';

import { ILibraryTabsProps, LibraryTabs } from './LibraryTabs';
import { useMenuStyles } from './MenuStyles';

interface MenuProps extends ILibraryTabsProps {}

export const Menu = ({ ...others }: MenuProps) => {
  const classes = useMenuStyles();

  return (
    <Box className={classes.root}>
      <LibraryTabs {...others} />
    </Box>
  );
};
