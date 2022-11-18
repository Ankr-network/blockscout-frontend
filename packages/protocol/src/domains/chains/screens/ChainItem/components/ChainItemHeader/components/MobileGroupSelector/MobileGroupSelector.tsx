import classNames from 'classnames';
import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { useCallback, useMemo } from 'react';
import { Select } from 'uiKit/Select';
import { useStyles } from './MobileGroupSelectorStyles';
import { getOptionsByTabs } from './utils/getOptionsByTabs';

interface Target {
  name?: string;
  value: unknown;
}

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
    (event: React.ChangeEvent<Target>) => {
      const chainGroup = event.target.value as ChainGroupID;

      onGroupSelect(chainGroup);
    },
    [onGroupSelect],
  );

  const options = useMemo(() => getOptionsByTabs(groups), [groups]);

  const classes = useStyles();

  return visible ? (
    <Select
      MenuProps={{
        classes: {
          paper: classes.menuPaper,
        },
      }}
      className={classNames(className, classes.mobileGroupSelector)}
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
