import { useCallback } from 'react';
import { MenuItem, SelectChangeEvent } from '@mui/material';
import { Select } from '@ankr.com/ui';

import { SortType } from 'modules/chains/types';

import { useChainsSortSelectStyles } from './useChainsSortSelectStyles';
import { useOptions } from './hooks/useOptions';

interface IChainsSortSelect {
  onSelect?: (type: SortType) => void;
  sortType?: SortType;
}

export const ChainsSortSelect = ({ onSelect, sortType }: IChainsSortSelect) => {
  const options = useOptions();

  const onChange = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      if (typeof onSelect === 'function') {
        onSelect(event.target.value as SortType);
      }
    },
    [onSelect],
  );

  const { classes } = useChainsSortSelectStyles();

  return (
    <Select
      className={classes.root}
      classes={{
        root: classes.selectRoot,
        select: classes.select,
      }}
      fullWidth={false}
      onChange={onChange}
      size="small"
      value={sortType}
    >
      {options.map(item => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  );
};
