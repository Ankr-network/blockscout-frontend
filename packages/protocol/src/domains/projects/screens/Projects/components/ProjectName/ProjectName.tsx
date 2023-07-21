import { Button, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { Info } from '@ankr.com/ui';

import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { useProjectNameStyles } from './useProjectNameStyles';
import { useProjectName } from './hooks/useProjectName';
import { UserEndpointDialog } from 'modules/common/components/UserEndpointDialog.tsx';
import { DeleteProjectDialog } from 'domains/jwtToken/components/DeleteProjectDialog';

interface ProjectNameProps {
  projectName: string;
  userEndpointToken: string;
  tokenIndex: number;
}

export const ProjectName = ({
  projectName,
  userEndpointToken,
  tokenIndex,
}: ProjectNameProps) => {
  const { classes } = useProjectNameStyles();

  const {
    copyText,
    shouldConnectWallet,
    isViewProjectDialogOpened,
    onCloseViewProjectDialog,
    handleDeleteProjectOpen,
    onOpenViewProjectDialog,
    isDeleteProjectDialogOpened,
    onCloseDeleteProjectDialog,
  } = useProjectName(userEndpointToken, tokenIndex);

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <Typography variant="subtitle1" className={classes.name} noWrap>
          {projectName}
        </Typography>
        <Button
          className={classes.button}
          variant="text"
          color="secondary"
          onClick={onOpenViewProjectDialog}
        >
          <Info size={24} />
        </Button>
      </div>
      <CopyToClipIcon
        className={classes.endpoint}
        text={userEndpointToken}
        copyText={copyText}
        message={t('common.copy-message')}
        textClassName={classes.text}
        messageClassName={classes.message}
      />
      <DeleteProjectDialog
        open={isDeleteProjectDialogOpened}
        tokenIndex={tokenIndex}
        onClose={onCloseDeleteProjectDialog}
      />
      <UserEndpointDialog
        isOpened={isViewProjectDialogOpened}
        onClose={onCloseViewProjectDialog}
        shouldConnectWallet={shouldConnectWallet}
        endpointToken={userEndpointToken}
        tokenIndex={tokenIndex}
        handleDeleteProjectOpen={handleDeleteProjectOpen}
      />
    </div>
  );
};
