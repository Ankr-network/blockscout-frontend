import { MenuItem, SelectChangeEvent, Typography } from '@mui/material';
import { FilterAlt, Select } from '@ankr.com/ui';
import { useCallback } from 'react';
import { t } from '@ankr.com/common';

import { ESortChainsType } from 'domains/projects/types';

import { useProjectEndpointsStyles } from '../useProjectEndpointsStyles';

const sortTypes = [
  {
    value: ESortChainsType.Trending,
    label: t('project.endpoints.sort.trending'),
  },
  {
    value: ESortChainsType.NameAZ,
    label: t('project.endpoints.sort.name-a-z'),
  },
  {
    value: ESortChainsType.NameZA,
    label: t('project.endpoints.sort.name-z-a'),
  },
  {
    value: ESortChainsType.UsageHighLow,
    label: t('project.endpoints.sort.usage-high-low'),
  },
  {
    value: ESortChainsType.UsageLowHigh,
    label: t('project.endpoints.sort.usage-low-high'),
  },
];

interface ISortSelectProps {
  sortType: ESortChainsType;
  setSortType: (sortType: ESortChainsType) => void;
  isDisabled: boolean;
}

export const SortSelect = ({
  isDisabled,
  setSortType,
  sortType,
}: ISortSelectProps) => {
  const handleChangeSortType = useCallback(
    (event: SelectChangeEvent<ESortChainsType>) => {
      setSortType(event.target.value as ESortChainsType);
    },
    [setSortType],
  );

  const { classes } = useProjectEndpointsStyles();

  return (
    <Select
      disabled={isDisabled}
      classes={{
        root: classes.sortSelectRoot,
      }}
      labelId="sort-label"
      id="sort"
      value={sortType}
      onChange={handleChangeSortType}
      variant="filled"
      renderValue={value => (
        <Typography variant="body3" className={classes.sortValue}>
          <FilterAlt className={classes.sortIcon} />
          {sortTypes.find(item => item.value === value)?.label}
        </Typography>
      )}
    >
      {sortTypes.map(item => (
        <MenuItem key={item.value} sx={{ width: '100%' }} value={item.value}>
          <Typography variant="body3">{item.label}</Typography>
        </MenuItem>
      ))}
    </Select>
  );
};
