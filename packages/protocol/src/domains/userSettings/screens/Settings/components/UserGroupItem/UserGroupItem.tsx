import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
} from '@mui/material';
import { ArrowDown, OverlaySpinner } from '@ankr.com/ui';
import { useMemo } from 'react';

import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { InviteTeammatesDialog } from 'modules/groups/components/InviteTeammatesDialog';

import { useUserGroupItemStyles } from './useUserGroupItemStyles';
import {
  useUserGroupItem,
  UseUserGroupItemProps,
} from './hooks/useUserGroupItem';
import { TeamTable } from '../TeamTable';
import { RenameTeamDialog } from '../Teams/components/RenameTeamDialog';
import { TeamMenu } from '../Teams/components/TeamMenu';
import { TeamHeader } from '../Teams/components/TeamHeader';
import { useTeamMenu } from '../Teams/components/TeamMenu/useTeamMenu';

interface UserGroupItemProps extends UseUserGroupItemProps {}

export const UserGroupItem = ({ group }: UserGroupItemProps) => {
  const { classes } = useUserGroupItemStyles();

  const {
    groupDetails,
    handleAccordionChange,
    handleInviteTeammatesDialogOpen,
    inviteTeammatesDialogProps,
    isExpanded,
    isExpanding,
    isGroupAvailableForManagement,
    hasRenamePermissions,
    isInviteTeammatesDialogLoading,
  } = useUserGroupItem({ group });

  const { handleMenuClick, renameTeamDialogProps, groupMenuProps } =
    useTeamMenu(group);

  const { email: userEmail = '', address: userAddress } = useAuth();

  const { selectedGroupAddress } = useSelectedUserGroup();

  const isCurrentGroupActive = group.address === selectedGroupAddress;

  const expandIcon = useMemo(() => {
    if (isExpanding) {
      return <OverlaySpinner size={24} />;
    }

    if (isGroupAvailableForManagement) {
      return <ArrowDown className={classes.expandIcon} />;
    }

    return undefined;
  }, [classes.expandIcon, isGroupAvailableForManagement, isExpanding]);

  const members = useMemo(() => {
    if (isGroupAvailableForManagement && groupDetails?.members) {
      return groupDetails.members;
    }

    const user = {
      address: userAddress,
      email: userEmail,
      role: group.role,
    };

    return [user];
  }, [
    group.role,
    groupDetails?.members,
    isGroupAvailableForManagement,
    userAddress,
    userEmail,
  ]);

  const pendingMembers = useMemo(() => {
    if (isGroupAvailableForManagement && groupDetails?.invitations) {
      return groupDetails.invitations;
    }

    return [];
  }, [groupDetails?.invitations, isGroupAvailableForManagement]);

  return (
    <Paper>
      <Accordion
        className={classes.accordion}
        onChange={handleAccordionChange}
        expanded={isExpanded || !isGroupAvailableForManagement}
      >
        <AccordionSummary
          classes={{
            content: classes.summaryContent,
          }}
          expandIcon={expandIcon}
        >
          <TeamHeader
            groupDetails={groupDetails}
            group={group}
            handleInviteClick={handleInviteTeammatesDialogOpen}
            handleMenuClick={handleMenuClick}
            isCurrentGroupActive={isCurrentGroupActive}
            isGroupAvailableForManagement={isGroupAvailableForManagement}
            isInviteTeammatesDialogLoading={isInviteTeammatesDialogLoading}
            hasRenamePermissions={hasRenamePermissions}
          />
        </AccordionSummary>
        <AccordionDetails>
          <TeamTable
            members={members}
            pendingMembers={pendingMembers}
            groupAddress={group.address}
          />
        </AccordionDetails>
      </Accordion>
      <TeamMenu {...groupMenuProps} />
      <InviteTeammatesDialog {...inviteTeammatesDialogProps} />
      <RenameTeamDialog {...renameTeamDialogProps} />
    </Paper>
  );
};
