import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useHistory } from 'react-router-dom';

import { columns } from './const';
import { useGroupsList } from './useGroupsList';
import { GroupsRoutesConfig } from '../../GroupsRoutesConfig';
import { UserGroupItemMapped } from '../../actions/getUserGroups';
import { useGroupListStyles } from './useGroupListStyles';

export const GroupsList = () => {
  const { classes } = useGroupListStyles();

  const { isLoading, isFetching, data, onChange, searchValue, handleSearch } =
    useGroupsList();

  const history = useHistory();

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!data) {
    return null;
  }

  const onGroupClick = (group: UserGroupItemMapped) => {
    history.push({
      pathname: GroupsRoutesConfig.groupDetails.generatePath(
        group.groupAddress,
      ),
    });
  };

  return (
    <>
      <Typography variant="h3">User Groups</Typography>

      <br />
      <Typography sx={{ mb: 2 }} display="block" variant="subtitle1">
        Find groups by user address:
      </Typography>
      <Input
        disabled={isLoading || isFetching}
        placeholder="ETH Address"
        onChange={onChange}
        value={searchValue}
        size="medium"
        sx={{ width: 280 }}
      />
      <Button sx={{ ml: 4 }} onClick={handleSearch}>
        Search
      </Button>
      <br />

      {isFetching ? (
        'Loading...'
      ) : (
        <TableContainer>
          <Table size="medium" aria-label="groups table">
            <TableHead>
              <TableRow>
                {columns.map(({ key, label }) => {
                  return <TableCell key={key}>{label}</TableCell>;
                })}
              </TableRow>
            </TableHead>

            <TableBody>
              {data?.map(group => {
                return (
                  <TableRow
                    key={group.groupAddress}
                    className={classes.row}
                    onClick={() => onGroupClick(group)}
                  >
                    <TableCell>{group.groupName}</TableCell>
                    <TableCell>{group.groupAddress}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
