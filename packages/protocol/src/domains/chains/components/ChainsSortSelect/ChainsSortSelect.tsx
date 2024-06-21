import { useCallback } from 'react';
import { SelectChangeEvent } from '@mui/material';

import { Select } from 'uiKit/Select';
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
      fullWidth={false}
      onChange={onChange}
      options={options}
      size="small"
      value={sortType}
    />
  );
};
