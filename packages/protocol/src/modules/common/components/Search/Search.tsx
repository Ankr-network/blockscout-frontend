import { ChangeEvent, useCallback } from 'react';
import { Icon, IconButton } from '@mui/material';
import { t } from '@ankr.com/common';
import { Close, Search as SearchIcon, TextField } from '@ankr.com/ui';

import { useSearchStyles } from './useSearchStyles';

interface ISearchProps {
  searchContent: string;
  setSearchContent: (searchContent: string) => void;
}

export const Search = ({ searchContent, setSearchContent }: ISearchProps) => {
  const { classes } = useSearchStyles(Boolean(searchContent));

  const handleResetClick = useCallback(
    () => setSearchContent(''),
    [setSearchContent],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;

      setSearchContent(value);
    },
    [setSearchContent],
  );

  return (
    <TextField
      value={searchContent}
      onChange={handleChange}
      placeholder={t('common.search')}
      InputProps={{
        className: classes.root,
        startAdornment: (
          <Icon>
            <SearchIcon className={classes.searchIcon} />
          </Icon>
        ),
        endAdornment: (
          <IconButton className={classes.iconButton} onClick={handleResetClick}>
            <Close />
          </IconButton>
        ),
      }}
    />
  );
};
