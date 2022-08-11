import { Select } from 'uiKit/Select';
import { useCallback, useMemo } from 'react';
import classNames from 'classnames';

import { ChainGroupID } from 'modules/endpoints/types';
import { IApiChain } from 'domains/chains/api/queryChains';
import { Tab } from 'modules/common/hooks/useTabs';
import { getOptionsByTabs } from './utils/getOptionsByTabs';
import { useStyles } from './MobileGroupSelectorStyles';

interface Target {
  name?: string;
  value: unknown;
}

export interface MobileGroupSelectorProps {
  chain: IApiChain;
  className?: string;
  groupID: ChainGroupID;
  groupTabs: Tab<ChainGroupID>[];
  onGroupSelect: (id: ChainGroupID) => void;
  visible?: boolean;
}

export const MobileGroupSelector = ({
  chain,
  className,
  groupID,
  groupTabs,
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

  const options = useMemo(
    () => getOptionsByTabs(groupTabs, chain),
    [groupTabs, chain],
  );

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
