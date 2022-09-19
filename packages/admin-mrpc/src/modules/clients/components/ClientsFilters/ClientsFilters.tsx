import { Button, Typography } from '@material-ui/core';
import classNames from 'classnames';

import { ClientType } from '../../types';
import { UserTypeTag } from '../UserTypeTag';
import { ClientMapped } from '../../store/clientsSlice';
import { useClientsFiltersStyles } from './useClientsFiltersStyles';

interface IClientsFiltersProps {
  handleFilterKey: (key: keyof ClientMapped) => void;
  handleFilterClientType: (i: ClientType) => void;
  filterClientType?: ClientType;
  filterKey?: keyof ClientMapped;
}

const clientTypeFilters = [
  ClientType.UNKNOWN,
  ClientType.PAYG,
  ClientType.TestDrivePremium,
  // ClientType.Premium,
  ClientType.ForcedExpirationPremium,
];

export const ClientsFilters: React.FC<IClientsFiltersProps> = ({
  handleFilterKey,
  handleFilterClientType,
  filterClientType,
  filterKey,
}) => {
  const classes = useClientsFiltersStyles();
  return (
    <div className={classes.root}>
      <Typography>Filters:</Typography>

      {clientTypeFilters.map(i => (
        <Button
          variant="outlined"
          key={i}
          onClick={() => handleFilterClientType(i)}
          className={classNames(
            classes.button,
            filterClientType === i && classes.buttonActive,
          )}
        >
          <UserTypeTag clientType={i} />
        </Button>
      ))}

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
    </div>
  );
};
