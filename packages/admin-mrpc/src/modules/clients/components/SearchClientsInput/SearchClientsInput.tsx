import { Button, Tooltip, TextField } from '@mui/material';
import { useSearchClientsInput } from './useSearchClientsInput';
import { useSearchInputStyles } from './useSearchInputStyles';

export const SearchClientsInput = () => {
  const { isLoading, searchValue, foundClients, onClientClick, onChange } =
    useSearchClientsInput();
  const { classes } = useSearchInputStyles();

  return (
    <div className={classes.root}>
      <TextField
        placeholder="Search by email or address"
        onChange={onChange}
        value={searchValue}
        className={classes.input}
        disabled={isLoading}
        size="small"
        hiddenLabel
        InputProps={{ sx: { 'label + &&&': { marginTop: 0 } } }}
      />
      {foundClients?.length > 0 && (
        <ul className={classes.clientsList}>
          {searchValue &&
            foundClients.length > 0 &&
            foundClients.map(client => {
              const title = client.email
                ? `${client.email}\n${client.address}`
                : client.address;

              return (
                <li key={client.user} className={classes.clientItem}>
                  <Tooltip placement="left" title={title || client.user}>
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
            })}
        </ul>
      )}
    </div>
  );
};
