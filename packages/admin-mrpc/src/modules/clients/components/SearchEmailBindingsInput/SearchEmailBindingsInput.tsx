import { useCallback, useMemo } from 'react';
import { Input } from '@mui/material';
import { IEmailBindingEntity } from 'multirpc-sdk';
import { useSearchEmailBindingsInput } from './useSearchEmailBindingsInput';
import { ClientTooltip } from '../SearchClientsInput/ClientTooltip';
import { useSearchInputStyles } from '../SearchClientsInput/useSearchInputStyles';

interface ISearchEmailBindingsInputProps {
  filterType: 'email' | 'address';
}

export const SearchEmailBindingsInput = ({
  filterType,
}: ISearchEmailBindingsInputProps) => {
  const { isLoading, searchValue, foundClients, onClientClick, onChange } =
    useSearchEmailBindingsInput(filterType);
  const { classes, cx } = useSearchInputStyles();

  const renderClient = useCallback(
    (client: IEmailBindingEntity) => {
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
    if (!searchValue) return null;

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
    classes.notFound,
    cx,
    foundClients,
    isLoading,
    renderClient,
    searchValue,
  ]);

  return (
    <div className={classes.root}>
      <Input
        placeholder={`Search by ${filterType}`}
        onChange={onChange}
        value={searchValue}
        className={classes.input}
        size="small"
        disableUnderline
        color="secondary"
      />

      <ul className={classes.clientsList}>{renderSearchResult}</ul>
    </div>
  );
};
