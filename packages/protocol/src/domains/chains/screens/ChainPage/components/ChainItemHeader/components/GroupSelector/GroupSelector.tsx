import { SelectChangeEvent } from '@mui/material';
import { useCallback, useMemo } from 'react';

import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { Select } from 'uiKit/Select';

import { getOptionsByTabs } from './utils/getOptionsByTabs';
import { useGroupSelectorStyles } from './useGroupSelectorStyles';

export interface GroupSelectorProps {
  className?: string;
  fullWidth?: boolean;
  groupID: ChainGroupID;
  groups: EndpointGroup[];
  onGroupSelect: (id: ChainGroupID) => void;
  rootClassName?: string;
  classNameInput?: string;
  visible?: boolean;
}

export const GroupSelector = ({
  className,
  classNameInput,
  fullWidth,
  groupID,
  groups,
  onGroupSelect,
  rootClassName,
  visible = true,
}: GroupSelectorProps) => {
  const onChange = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      const chainGroup = event.target.value as ChainGroupID;

      onGroupSelect(chainGroup);
    },
    [onGroupSelect],
  );

  const options = useMemo(() => getOptionsByTabs(groups), [groups]);

  const { classes, cx } = useGroupSelectorStyles();

  return visible ? (
    <Select
      MenuProps={{
        classes: {
          paper: classes.menuPaper,
        },
      }}
      rootClassName={rootClassName}
      className={cx(className, classes.groupSelectorRoot)}
      classes={{
        select: cx(classes.select, classNameInput),
      }}
      fullWidth={fullWidth}
      iconClassName={classes.selectIcon}
      onChange={onChange}
      options={options}
      value={groupID}
    />
  ) : null;
};
