import { Button } from '@mui/material';
import { Plus } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { Link } from 'react-router-dom';

import { useAppSelector } from 'store/useAppSelector';
import { selectIsGroupCreationAllowed } from 'domains/userGroup/store';
import { TeamsRoutesConfig } from 'domains/teams/Routes';

interface CreateTeamButtonProps {
  className?: string;
}

export const CreateTeamButton = ({ className }: CreateTeamButtonProps) => {
  const isGroupsCreationAllowed = useAppSelector(selectIsGroupCreationAllowed);

  return (
    <>
      {isGroupsCreationAllowed && (
        <Button
          className={className}
          color="primary"
          variant="text"
          startIcon={<Plus />}
          component={Link}
          to={TeamsRoutesConfig.newTeam.generatePath()}
        >
          {t('teams.create-team-button')}
        </Button>
      )}
    </>
  );
};
