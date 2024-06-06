import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  IPendingUserGroupMember,
  IUserGroupMember,
  Web3Address,
} from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { useTeamTableStyles } from './useTeamTableStyles';
import { TeamTableMembers } from '../TeamTableMembers';
import { TeamTablePendingMembers } from '../TeamTablePendingMembers';

interface TeamTableProps {
  members: IUserGroupMember[];
  pendingMembers: IPendingUserGroupMember[];
  groupAddress: Web3Address;
  isGroupAvailableForManagement: boolean;
}

export const TeamTable = ({
  groupAddress,
  isGroupAvailableForManagement,
  members,
  pendingMembers,
}: TeamTableProps) => {
  const { classes, cx } = useTeamTableStyles();

  return (
    <TableContainer component="div">
      <Table className={classes.groupTable}>
        <TableHead>
          <TableRow className={classes.row}>
            <TableCell className={cx(classes.cell, classes.th)}>
              {t('teams.team-table.header.users')}
            </TableCell>
            <TableCell className={cx(classes.cell, classes.th)}>
              {t('teams.team-table.header.access-role')}
            </TableCell>
            <TableCell className={cx(classes.cell, classes.th)} />
          </TableRow>
        </TableHead>
        <TableBody>
          <TeamTableMembers
            isGroupAvailableForManagement={isGroupAvailableForManagement}
            members={members}
            groupAddress={groupAddress}
          />
          <TeamTablePendingMembers
            isGroupAvailableForManagement={isGroupAvailableForManagement}
            pendingMembers={pendingMembers}
            groupAddress={groupAddress}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
};
