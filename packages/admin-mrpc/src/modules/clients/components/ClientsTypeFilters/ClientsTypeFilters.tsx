import { Button } from '@material-ui/core';
import classNames from 'classnames';
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
  ClientType.UNKNOWN,
  ClientType.PAYG,
  ClientType.TestDrivePremium,
  ClientType.Premium,
];

export const ClientsTypeFilters: React.FC<IClientsFiltersProps> = ({
  handleFilterClientType,
  filterClientType,
}) => {
  const history = useHistory();
  const classes = useClientsTypeFiltersStyles();

  const handleFilter = (i?: ClientType) => {
    const query = { clientType: i?.toString() || 'all' };
    const search = qs.stringify(query);
    history.push({ search });
    handleFilterClientType(i);
  };

  return (
    <div className={classes.root}>
      <Button
        variant="outlined"
        onClick={() => handleFilter(undefined)}
        className={classNames(
          classes.button,
          filterClientType === undefined && classes.buttonActive,
        )}
      >
        All
      </Button>

      {clientTypeFilters.map(i => (
        <Button
          variant="outlined"
          key={i}
          onClick={() => handleFilter(i)}
          className={classNames(
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
