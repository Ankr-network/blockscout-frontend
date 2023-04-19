import { useCallback, useMemo } from 'react';
import { t } from '@ankr.com/common';
import { Button, Typography } from '@mui/material';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { jwtTokenIntlRoot } from 'domains/jwtToken/utils/utils';
import { Dialog } from 'uiKit/Dialog';
import { useViewProjectDialogStyles } from './useViewProjectDialogStyles';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { useDialog } from 'modules/common/hooks/useDialog';
import { renderProjectName } from 'domains/jwtToken/utils/renderProjectName';
import { SignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';

interface IShowProjectDialogProps {
  shouldConnectWallet: boolean;
  token?: JwtManagerToken;
  isOpened: boolean;
  onClose: () => void;
  handleDeleteProject: () => void;
}

export const ViewProjectDialog = ({
  shouldConnectWallet,
  token,
  isOpened,
  onClose,
  handleDeleteProject,
}: IShowProjectDialogProps) => {
  const { classes } = useViewProjectDialogStyles();

  const { hasOauthLogin } = useAuth();

  const title = useMemo(() => renderProjectName(token?.index), [token?.index]);

  const {
    isOpened: isLoginOpened,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDialog();

  const handleLogin = useCallback(() => {
    onClose();
    onOpenLogin();
  }, [onClose, onOpenLogin]);

  const handleClose = useCallback(() => {
    onClose();
    onCloseLogin();
  }, [onClose, onCloseLogin]);

  return (
    <>
      <Dialog
        maxPxWidth={600}
        fullWidth
        open={isOpened}
        onClose={onClose}
        title={title}
        titleClassName={classes.title}
      >
        <div className={classes.content}>
          <Typography component="div" className={classes.legend}>
            {t(`${jwtTokenIntlRoot}.unique-token`)}
          </Typography>
          <CopyToClipIcon
            className={classes.filed}
            copyText={shouldConnectWallet ? undefined : t('common.copy')}
            message={t('common.copy-message')}
            size="l"
            text={
              shouldConnectWallet
                ? t('chains.connect-wallet')
                : token?.userEndpointToken ?? ''
            }
            textColor="textPrimary"
            onClick={shouldConnectWallet ? handleLogin : undefined}
            hideIcon={shouldConnectWallet}
          />
          <Button fullWidth size="large" onClick={onClose}>
            {t(`${jwtTokenIntlRoot}.view-project.button`)}
          </Button>
          {Boolean(token?.index) && (
            <GuardUserGroup blockName={BlockWithPermission.JwtManager}>
              <Button
                fullWidth
                size="large"
                variant="outlined"
                color="error"
                onClick={handleDeleteProject}
                className={classes.button}
              >
                {t(`${jwtTokenIntlRoot}.view-project.delete-project`)}
              </Button>
            </GuardUserGroup>
          )}
        </div>
      </Dialog>

      <SignupDialog
        onClose={handleClose}
        isOpen={isLoginOpened}
        hasOauthLogin={hasOauthLogin}
      />
    </>
  );
};
