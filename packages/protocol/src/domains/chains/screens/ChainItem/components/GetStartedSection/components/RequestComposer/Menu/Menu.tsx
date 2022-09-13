import { Box } from '@material-ui/core';
import { EndpointGroup } from 'modules/endpoints/types';

import { LibraryTabs } from './LibraryTabs';

interface MenuProps {
  className?: string;
  group: EndpointGroup;
}

export const Menu = ({ className, group }: MenuProps) => {
  return (
    <Box className={className}>
      <LibraryTabs group={group} />
    </Box>
  );
};
