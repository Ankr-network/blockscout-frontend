import { AccordionDetails, Box } from '@mui/material';
import { ChainPath } from '@ankr.com/chains-list';

import { EndpointGroup } from 'modules/endpoints/types';
import { useTreeStyles } from 'modules/common/styles/useTreeStyles';

import { GroupSelector } from '../GroupSelector';
import { useGroupsSelectorStyles } from './useGroupsSelectorStyles';

export interface GroupsSelectorProps {
  groups: EndpointGroup[];
  handleUpdateNetworksPaths: (paths: ChainPath[]) => void;
  selectedSubchainPaths: ChainPath[];
}

export const GroupsSelector = ({
  groups,
  handleUpdateNetworksPaths,
  selectedSubchainPaths,
}: GroupsSelectorProps) => {
  const { classes } = useGroupsSelectorStyles();
  const { classes: classesTree, cx } = useTreeStyles();

  return (
    <AccordionDetails>
      <Box className={cx(classes.root, classesTree.treeWrapper)}>
        {groups.map(group => (
          <GroupSelector
            group={group}
            handleUpdateNetworksPaths={handleUpdateNetworksPaths}
            key={group.id}
            selectedSubchainPaths={selectedSubchainPaths}
          />
        ))}
      </Box>
    </AccordionDetails>
  );
};
