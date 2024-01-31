import { t } from '@ankr.com/common';
import { useCallback } from 'react';
import { useHistory } from 'react-router';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useDialog } from 'modules/common/hooks/useDialog';

export interface IUseLinkExpiredDialogProps {
  handleParentDialogClose: () => void;
  handleParentDialogOpen: () => void;
}

const signUpButtonKey = 'teams.link-expired-dialog.sign-in';
const projectsButtonKey = 'teams.link-expired-dialog.go-to-projects';

export const useLinkExpiredDialog = ({
  handleParentDialogClose,
  handleParentDialogOpen,
}: IUseLinkExpiredDialogProps) => {
  const {
    isOpened: isSignUpDialogOpened,
    onClose: handleClose,
    onOpen: handleSignUpDialogOpen,
  } = useDialog();

  const { push } = useHistory();

  const { isLoggedIn, hasOauthLogin } = useAuth();

  const handleSignUpButtonClick = useCallback(() => {
    handleParentDialogClose();
    handleSignUpDialogOpen();
  }, [handleParentDialogClose, handleSignUpDialogOpen]);

  const handleSingUpDialogClose = useCallback(() => {
    handleClose();

    handleParentDialogOpen();
  }, [handleClose, handleParentDialogOpen]);

  const redirectToProjects = useCallback(
    () => push(ProjectsRoutesConfig.projects.generatePath()),
    [push],
  );

  const redirectToEndpoints = useCallback(
    () => push(ChainsRoutesConfig.chains.generatePath({ isLoggedIn: false })),
    [push],
  );

  const [handleDialogClose, handleButtonClick, buttonText] = isLoggedIn
    ? [redirectToProjects, redirectToProjects, t(projectsButtonKey)]
    : [redirectToEndpoints, handleSignUpButtonClick, t(signUpButtonKey)];

  return {
    buttonText,
    handleButtonClick,
    handleDialogClose,
    handleSingUpDialogClose,
    hasOauthLogin,
    isSignUpDialogOpened,
  };
};
