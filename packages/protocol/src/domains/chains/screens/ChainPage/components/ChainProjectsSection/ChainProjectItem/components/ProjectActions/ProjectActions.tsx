import { Button, Skeleton } from '@mui/material';
import { Plus } from '@ankr.com/ui';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { CodeExampleModal } from 'modules/chains/components/CodeExampleModal';
import { CopyEndpointModal } from 'modules/chains/components/CopyEndpointModal';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { Placeholder } from 'modules/common/components/Placeholder';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import {
  IUseProjectActionsProps,
  useProjectActions,
} from './hooks/useProjectActions';
import { projectActionsTranslation } from './translation';
import { useProjectActionsStyles } from './useProjectActionsStyles';

export interface IProjectActionsProps extends IUseProjectActionsProps {
  isCurrentChainIncluded: boolean;
  jwts: JWT[];
  loading: boolean;
  projectWhitelistBlockchains: string[];
}

export const ProjectActions = ({
  chain,
  handleAddToProjectsDialogOpen,
  isCurrentChainIncluded,
  jwt,
  jwts,
  loading,
  projectWhitelistBlockchains,
}: IProjectActionsProps) => {
  const { classes } = useProjectActionsStyles();
  const { keys, t } = useTranslation(projectActionsTranslation);

  const {
    handleCodeExampleDialogClose,
    handleCodeExampleDialogOpen,
    isCodeExampleDialogDisabled,
    isCodeExampleDialogOpened,
    onAddToProjectButtonClick,
    projectChain,
    userEndpointToken,
  } = useProjectActions({
    chain,
    handleAddToProjectsDialogOpen,
    jwt,
    projectWhitelistBlockchains,
  });

  if (loading) {
    return <Skeleton className={classes.skeleton} width={100} height={40} />;
  }

  const addToProjectButton = (
    <GuardUserGroup blockName={BlockWithPermission.JwtManagerRead}>
      <Button
        onClick={onAddToProjectButtonClick}
        size="small"
        startIcon={<Plus />}
        variant="outlined"
      >
        {t(keys.addToProject)}
      </Button>
    </GuardUserGroup>
  );

  return (
    <div className={classes.root}>
      <Placeholder
        hasPlaceholder={!isCurrentChainIncluded}
        placeholder={addToProjectButton}
      >
        <CopyEndpointModal
          chain={projectChain}
          jwtTokens={jwts}
          userEndpointToken={userEndpointToken}
        />
        {!isCodeExampleDialogDisabled && (
          <>
            <Button
              onClick={handleCodeExampleDialogOpen}
              variant="outlined"
              size="small"
              className={classes.codeExampleButton}
              disabled={isCodeExampleDialogDisabled}
            >
              {t(keys.codeExample)}
            </Button>
            <CodeExampleModal
              isOpenedCodeExample={isCodeExampleDialogOpened}
              onCloseCodeExample={handleCodeExampleDialogClose}
              chain={projectChain}
            />
          </>
        )}
      </Placeholder>
    </div>
  );
};
