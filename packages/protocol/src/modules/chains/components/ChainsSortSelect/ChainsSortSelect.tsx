import { ESortChainsType } from '@ankr.com/chains-list';
import { FilterAlt, Select } from '@ankr.com/ui';
import { MenuItem, SelectChangeEvent, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { useCallback } from 'react';

import { selectIsLoggedIn } from 'domains/auth/store';
import { useAppSelector } from 'store/useAppSelector';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';

import { useChainsSortSelectStyles } from './useChainsSortSelectStyles';

const namesSortTypes = [
  {
    value: ESortChainsType.NameAZ,
    label: t('project.endpoints.sort.name-a-z'),
  },
  {
    value: ESortChainsType.NameZA,
    label: t('project.endpoints.sort.name-z-a'),
  },
];

const publicSortTypes = [
  {
    value: ESortChainsType.Trending,
    label: t('project.endpoints.sort.trending'),
  },
  ...namesSortTypes,
];

const usageSortTypes = [
  {
    value: ESortChainsType.UsageHighLow,
    label: t('project.endpoints.sort.usage-high-low'),
  },
  {
    value: ESortChainsType.UsageLowHigh,
    label: t('project.endpoints.sort.usage-low-high'),
  },
];

const privateSortTypes = [...publicSortTypes, ...usageSortTypes];

const enterpriseSortTypes = [...usageSortTypes, ...namesSortTypes];

const getSortTypes = ({
  isEnterpriseClient,
  isLoggedIn,
}: {
  isEnterpriseClient: boolean;
  isLoggedIn: boolean;
}) => {
  if (isEnterpriseClient) {
    return enterpriseSortTypes;
  }

  if (isLoggedIn) {
    return privateSortTypes;
  }

  return publicSortTypes;
};

interface ISortSelectProps {
  sortType: ESortChainsType;
  setSortType: (sortType: ESortChainsType) => void;
  isDisabled: boolean;
  className?: string;
}

export const ChainsSortSelect = ({
  className,
  isDisabled,
  setSortType,
  sortType,
}: ISortSelectProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const { isEnterpriseClient } = useEnterpriseClientStatus();

  const handleChangeSortType = useCallback(
    (event: SelectChangeEvent<ESortChainsType>) => {
      setSortType(event.target.value as ESortChainsType);
    },
    [setSortType],
  );

  const sortTypes = getSortTypes({ isLoggedIn, isEnterpriseClient });

  const { classes, cx } = useChainsSortSelectStyles();

  return (
    <Select
      disabled={isDisabled}
      classes={{
        root: cx(classes.sortSelectRoot, className),
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
