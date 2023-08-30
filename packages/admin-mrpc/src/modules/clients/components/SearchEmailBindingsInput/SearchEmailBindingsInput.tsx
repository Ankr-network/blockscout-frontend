import { useCallback, useMemo } from 'react';
import { Close } from '@ankr.com/ui';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { IEmailBindingEntity, IUserByTokenResponse } from 'multirpc-sdk';

import {
  FilterType,
  MIN_SEARCH_VALUE_LENGTH,
  useSearchEmailBindingsInput,
} from './useSearchEmailBindingsInput';
import { ClientTooltip } from '../ClientsTooltip';
import { useSearchEmailBindingsInputStyles } from './useSearchEmailBindingsInputStyles';

interface ISearchEmailBindingsInputProps {
  filterType: FilterType;
}

export const SearchEmailBindingsInput = ({
  filterType,
}: ISearchEmailBindingsInputProps) => {
  const { classes, cx } = useSearchEmailBindingsInputStyles();

  const {
    error,
    isLoading,
    searchValue,
    setSearchValue,
    foundClients,
    onClientClick,
    onChange,
  } = useSearchEmailBindingsInput(filterType);

  const handleReset = () => {
    setSearchValue('');
  };

  const renderClient = useCallback(
    (client: IEmailBindingEntity | IUserByTokenResponse) => {
      const title = client.email
        ? `${client.email}\n${client.address}`
        : client.address;

      return (
        <ClientTooltip
          key={client.address || client.email}
          title={title}
          client={client}
          classes={classes}
          onClientClick={onClientClick}
        />
      );
    },
    [classes, onClientClick],
  );

  const renderSearchResult = useMemo(() => {
    if (!searchValue || searchValue.length < MIN_SEARCH_VALUE_LENGTH)
      return null;

    if (error) {
      return <li className={cx(classes.clientItem, classes.error)}>{error}</li>;
    }

    if (isLoading) {
      return (
        <li className={cx(classes.clientItem, classes.notFound)}>Loading...</li>
      );
    }

    if (foundClients.length <= 0) {
      return (
        <li className={cx(classes.clientItem, classes.notFound)}>
          Nothing found
        </li>
      );
    }

    return foundClients.map(renderClient);
  }, [
    classes.clientItem,
    classes.error,
    classes.notFound,
    cx,
    foundClients,
    error,
    isLoading,
    renderClient,
    searchValue,
  ]);

  return (
    <div className={classes.root}>
      <TextField
        placeholder={`Search by ${filterType}`}
        onChange={onChange}
        value={searchValue}
        size="small"
        color="secondary"
        InputProps={{
          classes: { root: classes.input },
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
        type={filterType === 'email' ? 'email' : 'text'}
        autoComplete="off"
      />

      <ul className={classes.clientsList}>{renderSearchResult}</ul>
    </div>
  );
};
