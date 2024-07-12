import { ChangeEvent, useCallback } from 'react';
import { Icon, IconButton } from '@mui/material';
import { t } from '@ankr.com/common';
import { Close, Search as SearchIcon, TextField } from '@ankr.com/ui';

import { useSearchStyles } from './useSearchStyles';

interface ISearchProps {
  className?: string;
  rootClassName?: string;
  searchContent: string;
  setSearchContent: (searchContent: string) => void;
}

export const Search = ({
  className,
  rootClassName,
  searchContent,
  setSearchContent,
}: ISearchProps) => {
  const { classes, cx } = useSearchStyles(Boolean(searchContent));

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
      className={rootClassName}
      value={searchContent}
      onChange={handleChange}
      placeholder={t('common.search')}
      size="small"
      InputProps={{
        className: cx(classes.root, className),
        startAdornment: (
          <Icon className={classes.icon}>
            <SearchIcon className={classes.searchIcon} />
          </Icon>
        ),
        endAdornment: (
          <IconButton className={classes.iconButton} onClick={handleResetClick}>
            <Close className={classes.icon} />
          </IconButton>
        ),
      }}
    />
  );
};
