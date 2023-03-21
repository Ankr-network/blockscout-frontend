import { Box, Paper, Typography } from '@mui/material';
import { ClientsTable } from 'modules/clients/components/ClientsTable';
import { useGroupDetails } from './useGroupDetails';

export const GroupDetails = () => {
  const {
    isLoadingGroupDetails,
    groupClients,
    groupDetails,
    hasMembers,
    handleMouseEnter,
    handleMouseLeave,
    activeItem,
  } = useGroupDetails();

  if (isLoadingGroupDetails) {
    return <>Loading...</>;
  }

  return (
    <>
      <Paper sx={{ p: 6, mt: 6 }}>
        {groupDetails?.name && (
          <Typography variant="h4">{groupDetails.name}</Typography>
        )}
        <br />
        <br />
        <Typography>
          <b>Group Address: </b>
          {groupDetails?.address}
        </Typography>
        <br />
        <br />
        <br />
        <Typography>
          <b>Group Members:</b> {!hasMembers && 'Group is empty'}
        </Typography>
        <br />
        {groupDetails?.members?.map(client => {
          return (
            <Box
              onMouseEnter={() => handleMouseEnter(client.address)}
              onMouseLeave={handleMouseLeave}
              key={client.address}
            >
              <br />
              <b>User Role: </b>
              {client.role}
              <br />
              <b>User Address: </b>
              {client.address}
              <br />
            </Box>
          );
        })}
      </Paper>
      <br />
      <br />
      {hasMembers && (
        <ClientsTable activeItemAddress={activeItem} clients={groupClients} />
      )}
    </>
  );
};
