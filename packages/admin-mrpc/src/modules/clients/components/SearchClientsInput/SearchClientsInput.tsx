import { useCallback } from 'react';
import { Input } from '@mui/material';
import { IEmailBindingEntity } from 'multirpc-sdk';

import { ClientMapped } from 'modules/clients/store/clientsSlice';

import { useSearchClientsInput } from './useSearchClientsInput';
import { ClientTooltip } from './ClientTooltip';
import { useSearchInputStyles } from './useSearchInputStyles';

export const SearchClientsInput = () => {
  const { isLoading, searchValue, foundClients, onClientClick, onChange } =
    useSearchClientsInput();
  const { classes, cx } = useSearchInputStyles();

  const renderClient = useCallback(
    (client: ClientMapped) => {
      const title = client.email
        ? `${client.email}\n${client.address}`
        : client.address || client.user || '';

      return (
        <ClientTooltip
          key={client.user || client.address}
          title={title}
          client={client as IEmailBindingEntity}
          classes={classes}
          onClientClick={onClientClick}
        />
      );
    },
    [classes, onClientClick],
  );

  return (
    <div className={classes.root}>
      <Input
        placeholder="Search by email/address/token"
        onChange={onChange}
        value={searchValue}
        className={classes.input}
        disabled={isLoading}
        size="small"
        disableUnderline
        color="secondary"
      />

      {searchValue && (
        <ul className={classes.clientsList}>
          {foundClients.length > 0 ? (
            foundClients.map(renderClient)
          ) : (
            <li className={cx(classes.clientItem, classes.notFound)}>
              Nothing found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
