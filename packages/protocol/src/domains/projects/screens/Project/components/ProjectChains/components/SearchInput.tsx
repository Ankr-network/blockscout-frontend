import { Close, Search } from '@ankr.com/ui';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { ChangeEvent, useCallback } from 'react';

import { useProjectEndpointsStyles } from '../useProjectEndpointsStyles';

interface ISearchInputProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export const SearchInput = ({
  searchValue,
  setSearchValue,
}: ISearchInputProps) => {
  const onChangeSearchValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    },
    [setSearchValue],
  );

  const handleReset = useCallback(() => {
    setSearchValue('');
  }, [setSearchValue]);

  const { classes } = useProjectEndpointsStyles();

  return (
    <TextField
      className={classes.searchInputField}
      type="text"
      sx={{ mr: 6 }}
      name="search"
      id="search"
      placeholder="Search"
      value={searchValue}
      onChange={onChangeSearchValue}
      size="small"
      InputProps={{
        startAdornment: <Search className={classes.searchIcon} />,
        endAdornment: !!searchValue && (
          <InputAdornment position="end" disablePointerEvents={false}>
            <IconButton
              onClick={handleReset}
              size="small"
              edge="end"
              color="primary"
            >
              <Close />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
