import { IconButton, Paper, InputBase } from '@material-ui/core';

import { t } from 'common';

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    handleChangeSearch(event.target.value);
  const clearValue = () => handleChangeSearch('');

  return (
    <Paper className={classes.root} component="form">
      <SearchIcon className={classes.icon} />

      <InputBase
        className={classes.input}
        placeholder={t('referrals.referrals-table.search-placeholder')}
        value={value}
        onChange={handleChange}
      />

      <IconButton className={classes.btn} onClick={clearValue}>
        <ClearIcon className={classes.icon} />
      </IconButton>
    </Paper>
  );
};
