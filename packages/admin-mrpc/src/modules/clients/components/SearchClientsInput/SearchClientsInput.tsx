import { useCallback } from 'react';
import { Button, Input, Tooltip } from '@mui/material';
import { ClientMapped } from 'modules/clients/store/clientsSlice';
import { useSearchClientsInput } from './useSearchClientsInput';
import { useSearchInputStyles } from './useSearchInputStyles';

export const SearchClientsInput = () => {
  const { isLoading, searchValue, foundClients, onClientClick, onChange } =
    useSearchClientsInput();
  const { classes, cx } = useSearchInputStyles();

  const renderClient = useCallback(
    (client: ClientMapped) => {
      const title = client.email
        ? `${client.email}\n${client.address}`
        : client.address;

      return (
        <li key={client.user || client.address} className={classes.clientItem}>
          <Tooltip
            placement="left"
            title={title || client.user || client.address}
          >
            <Button
              variant="text"
              className={classes.clientButton}
              onClick={() => onClientClick(client.address)}
            >
              {client.email || client.address}
            </Button>
          </Tooltip>
        </li>
      );
    },
    [classes.clientButton, classes.clientItem, onClientClick],
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
