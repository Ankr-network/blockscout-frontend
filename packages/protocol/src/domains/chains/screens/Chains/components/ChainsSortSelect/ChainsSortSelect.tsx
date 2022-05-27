import React, { ChangeEvent, useCallback } from 'react';

import { Select } from 'uiKit/Select';
import { useStyles } from './ChainsSortSelectStyles';
import { SortType, useOptions } from './ChainsSortSelectUtils';

interface IChainsSortSelect {
  onSelect?: (type: SortType) => void;
  sortType?: SortType;
}

export const ChainsSortSelect = ({ sortType, onSelect }: IChainsSortSelect) => {
  const classes = useStyles();
  const options = useOptions();

  const onChange = useCallback(
    (event: ChangeEvent<{ value: unknown }>) => {
      if (typeof onSelect === 'function') {
        onSelect(event.target.value as SortType);
      }
    },
    [onSelect],
  );

  return (
    <Select
      className={classes.root}
      value={sortType}
      onChange={onChange}
      options={options}
      fullWidth={false}
    />
  );
};
