import { t } from '@ankr.com/common';
import { IconButton, Paper, InputBase } from '@material-ui/core';

import { ClearIcon } from 'uiKit/Icons/ClearIcon';
import { SearchIcon } from 'uiKit/Icons/SearchIcon';

import { useSearchFieldStyles } from './useSearchFieldStyles';

interface ISearchFieldProps {
  value: string;
  handleChangeSearch: (value: string) => void;
}

export const SearchField = ({
  value,
  handleChangeSearch,
}: ISearchFieldProps): JSX.Element => {
  const classes = useSearchFieldStyles();

  const handleChange = (searchValue: string) => handleChangeSearch(searchValue);
  const clearValue = () => handleChangeSearch('');

  return (
    <Paper className={classes.root} component="form">
      <SearchIcon className={classes.icon} />

      <InputBase
        className={classes.input}
        placeholder={t('referrals.referrals-table.search-placeholder')}
        value={value}
        onChange={event => {
          const { value: inputValue } = event.target;
          const validated = inputValue.match(/^[a-zA-Z0-9]*$/);
          if (validated) {
            handleChange(inputValue);
          }
        }}
        onKeyPress={e => {
          if (e.key === 'Enter') e.preventDefault();
        }}
      />

      <IconButton className={classes.btn} onClick={clearValue}>
        <ClearIcon className={classes.icon} />
      </IconButton>
    </Paper>
  );
};
