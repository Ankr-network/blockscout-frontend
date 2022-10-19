import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import qs from 'query-string';

import { ClientType } from '../../types';
import { clientTypeNaming } from '../UserTypeTag/const';
import { useClientsTypeFiltersStyles } from './useClientsTypeFiltersStyles';

interface IClientsFiltersProps {
  handleFilterClientType: (i?: ClientType) => void;
  filterClientType?: ClientType;
}

const clientTypeFilters = [
  ClientType.PAYG,
  ClientType.TestDrivePremium,
  ClientType.Premium,
];

export const ClientsTypeFilters: React.FC<IClientsFiltersProps> = ({
  handleFilterClientType,
  filterClientType,
}) => {
  const history = useHistory();
  const { classes, cx } = useClientsTypeFiltersStyles();

  const handleFilter = (i?: ClientType) => {
    const query = { clientType: i?.toString() || 'all' };
    const search = qs.stringify(query);
    history.push({ search });
    handleFilterClientType(i);
  };

  return (
    <div className={classes.root}>
      <Button
        variant="text"
        onClick={() => handleFilter(undefined)}
        className={cx(
          classes.button,
          filterClientType === undefined && classes.buttonActive,
        )}
      >
        All
      </Button>

      {clientTypeFilters.map(i => (
        <Button
          variant="text"
          key={i}
          onClick={() => handleFilter(i)}
          className={cx(
            classes.button,
            filterClientType === i && classes.buttonActive,
          )}
        >
          {clientTypeNaming[i]}
        </Button>
      ))}
    </div>
  );
};
