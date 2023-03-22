import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@ankr.com/ui';
import { ClientsTable } from 'modules/clients/components/ClientsTable';
import { useDevDaoUsersList } from './useDevDaoUsersList';
import { filters } from '../../const';

export const DevDaoUsersList = () => {
  const {
    dateFrom,
    onChangeFrom,
    dateTo,
    onChangeTo,
    requestClients,
    isLoading,
    clientsDevDao,
    filter,
    handleSelectFilter,
  } = useDevDaoUsersList();

  return (
    <>
      <Paper sx={{ p: 8, mt: 8, mb: 8 }}>
        <Typography variant="h4" mb={6}>
          Request for DevDao users list
        </Typography>

        <TextField
          label="From"
          type="dateTime-local"
          sx={{ mr: 6 }}
          name="from"
          id="from"
          placeholder="From"
          value={dateFrom}
          onChange={onChangeFrom}
        />

        <TextField
          label="To"
          type="dateTime-local"
          sx={{ mr: 6 }}
          name="to"
          id="to"
          placeholder="To"
          value={dateTo}
          onChange={onChangeTo}
        />

        <FormControl sx={{ width: 200 }}>
          <InputLabel id="filter-label">Filter</InputLabel>
          <Select
            labelId="filter-label"
            id="filter"
            value={filter}
            label="Filter"
            onChange={handleSelectFilter}
            variant="outlined"
          >
            {filters.map(item => (
              <MenuItem
                key={item.value}
                sx={{ width: '100%', p: 8 }}
                value={item.value}
              >
                <Typography variant="body1">{item.label}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <br />

        <LoadingButton
          size="large"
          sx={{ mt: 6 }}
          onClick={requestClients}
          disabled={!dateFrom || !dateTo}
          loading={isLoading}
        >
          Request
        </LoadingButton>
      </Paper>
      {clientsDevDao.length > 0 && <ClientsTable clients={clientsDevDao} />}
    </>
  );
};
