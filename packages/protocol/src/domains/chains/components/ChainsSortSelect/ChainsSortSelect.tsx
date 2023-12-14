import { useCallback } from 'react';
import { SelectChangeEvent } from '@mui/material';

import { Select } from 'uiKit/Select';
import { SortType } from 'modules/chains/types';

import { useOptions } from './ChainsSortSelectUtils';
import { useStyles } from './ChainsSortSelectStyles';

interface IChainsSortSelect {
  onSelect?: (type: SortType) => void;
  sortType?: SortType;
}

export const ChainsSortSelect = ({ sortType, onSelect }: IChainsSortSelect) => {
  const { classes } = useStyles();
  const options = useOptions();

  const onChange = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      if (typeof onSelect === 'function') {
        onSelect(event.target.value as SortType);
      }
    },
    [onSelect],
  );

  return (
    <Select
      className={classes.root}
      iconClassName={classes.icon}
      value={sortType}
      onChange={onChange}
      options={options}
      fullWidth={false}
      size="small"
    />
  );
};
