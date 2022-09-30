import { Button } from '@material-ui/core';
import classNames from 'classnames';
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
  const classes = useClientsTypeFiltersStyles();
  return (
    <>
      <Button
        variant="outlined"
        className={classNames(
          classes.button,
          filterKey === 'email' && classes.buttonActive,
        )}
        onClick={() => handleFilterKey('email')}
      >
        with emails
      </Button>

      <Button
        variant="outlined"
        className={classNames(
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
