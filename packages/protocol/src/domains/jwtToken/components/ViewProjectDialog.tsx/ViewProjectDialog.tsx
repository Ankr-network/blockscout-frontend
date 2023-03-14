import { useCallback, useMemo } from 'react';
import { t } from '@ankr.com/common';
import { Button, Typography } from '@mui/material';

import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import {
  jwtTokenIntlRoot,
  PRIMARY_TOKEN_INDEX,
} from 'domains/jwtToken/utils/utils';
import { Dialog } from 'uiKit/Dialog';
import { useViewProjectDialogStyles } from './useViewProjectDialogStyles';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { useDialog } from 'modules/common/hooks/useDialog';
import { ConnectWalletsContent } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog/ConnectWalletsContent';

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

  const title = useMemo(
    () =>
      token?.index === PRIMARY_TOKEN_INDEX
        ? t(`${jwtTokenIntlRoot}.default-project-name`)
        : t(`${jwtTokenIntlRoot}.additional`, {
            index: token?.index,
          }),
    [token?.index],
  );

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
          )}
        </div>
      </Dialog>
      <Dialog
        maxPxWidth={600}
        onClose={handleClose}
        open={isLoginOpened}
        title={t('signup-modal.web3.title')}
        titleClassName={classes.title}
        closeButtonClassName={classes.closeButton}
      >
        <ConnectWalletsContent onClose={handleClose} />
      </Dialog>
    </>
  );
};
