import { SelectChangeEvent } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { Select } from 'uiKit/Select';
import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { useStyles } from './MobileGroupSelectorStyles';
import { getOptionsByTabs } from './utils/getOptionsByTabs';

export interface MobileGroupSelectorProps {
  className?: string;
  groupID: ChainGroupID;
  groups: EndpointGroup[];
  onGroupSelect: (id: ChainGroupID) => void;
  visible?: boolean;
}

export const MobileGroupSelector = ({
  className,
  groupID,
  groups,
  onGroupSelect,
  visible = true,
}: MobileGroupSelectorProps) => {
  const onChange = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      const chainGroup = event.target.value as ChainGroupID;

      onGroupSelect(chainGroup);
    },
    [onGroupSelect],
  );

  const options = useMemo(() => getOptionsByTabs(groups), [groups]);

  const { classes, cx } = useStyles();

  return visible ? (
    <Select
      MenuProps={{
        classes: {
          paper: classes.menuPaper,
        },
      }}
      className={cx(className, classes.mobileGroupSelector)}
      classes={{
        select: classes.select,
      }}
      fullWidth={false}
      iconClassName={classes.selectIcon}
      onChange={onChange}
      options={options}
      value={groupID}
    />
  ) : null;
};
