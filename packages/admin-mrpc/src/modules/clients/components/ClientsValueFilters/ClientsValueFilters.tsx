import { Button } from '@mui/material';
import { useClientsTypeFiltersStyles } from '../ClientsTypeFilters/useClientsTypeFiltersStyles';
import { ClientMapped } from '../../store/clientsSlice';

interface IClientsValueFiltersProps {
  filterKey?: keyof ClientMapped;
  handleFilterKey: (key: keyof ClientMapped) => void;
}

export const ClientsValueFilters = ({
  filterKey,
  handleFilterKey,
}: IClientsValueFiltersProps) => {
  const { classes, cx } = useClientsTypeFiltersStyles();
  return (
    <>
      <Button
        variant="text"
        className={cx(
          classes.button,
          filterKey === 'email' && classes.buttonActive,
        )}
        onClick={() => handleFilterKey('email')}
      >
        with emails
      </Button>

      <Button
        variant="text"
        className={cx(
          classes.button,
          filterKey === 'amount' && classes.buttonActive,
        )}
        onClick={() => handleFilterKey('amount')}
      >
        with balances
      </Button>
    </>
  );
};
