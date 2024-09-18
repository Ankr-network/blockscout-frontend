import { useCallback, useMemo } from 'react';
import { t } from '@ankr.com/common';
import { Button, Typography } from '@mui/material';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { jwtTokenIntlRoot } from 'domains/jwtToken/utils/utils';
import { Dialog } from 'uiKit/Dialog';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { useDialog } from 'modules/common/hooks/useDialog';
import { renderProjectName } from 'domains/jwtToken/utils/renderProjectName';
import { SignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';

import { useUserEndpointDialogStyles } from './useUserEndpointDialogStyles';

interface IShowUserEndpointDialogProps {
  shouldConnectWallet: boolean;
  isOpened: boolean;
  onClose: () => void;
  handleDeleteProjectOpen?: () => void;
  tokenIndex?: number;
  name?: string;
  endpointToken?: string;
}

// TODO:  https://ankrnetwork.atlassian.net/browse/MRPC-3212
export const UserEndpointDialog = ({
  endpointToken,
  handleDeleteProjectOpen,
  isOpened,
  name,
  onClose,
  shouldConnectWallet,
  tokenIndex,
}: IShowUserEndpointDialogProps) => {
  const { classes } = useUserEndpointDialogStyles();

  const { hasOauthLogin } = useAuth();

  const title = useMemo(
    () => name || renderProjectName(tokenIndex),
    [name, tokenIndex],
  );

  const {
    isOpened: isLoginOpened,
    onClose: onCloseLogin,
    onOpen: onOpenLogin,
  } = useDialog();

  const handleLoginDialogOpen = useCallback(() => {
    onClose();
    onOpenLogin();
  }, [onClose, onOpenLogin]);

  const handleLoginDialogClose = useCallback(() => {
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
                : endpointToken || ''
            }
            textColor="textPrimary"
            onClick={shouldConnectWallet ? handleLoginDialogOpen : undefined}
            hideIcon={shouldConnectWallet}
          />
          <Button fullWidth size="large" onClick={onClose}>
            {t(`${jwtTokenIntlRoot}.view-project.button`)}
          </Button>
          {Boolean(tokenIndex) && Boolean(handleDeleteProjectOpen) && (
            <GuardUserGroup blockName={BlockWithPermission.JwtManagerWrite}>
              <Button
                fullWidth
                size="large"
                variant="outlined"
                color="error"
                onClick={handleDeleteProjectOpen}
                className={classes.button}
              >
                {t(`${jwtTokenIntlRoot}.view-project.delete-project`)}
              </Button>
            </GuardUserGroup>
          )}
        </div>
      </Dialog>

      <SignupDialog
        onClose={handleLoginDialogClose}
        isOpen={isLoginOpened}
        hasOauthLogin={hasOauthLogin}
      />
    </>
  );
};
