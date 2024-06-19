import { t } from '@ankr.com/common';
import { useCallback } from 'react';
import { useHistory } from 'react-router';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { useAuth } from 'domains/auth/hooks/useAuth';

export interface IUseLinkExpiredDialogProps {
  handleSignInDialogOpen: () => void;
}

const signUpButtonKey = 'teams.link-expired-dialog.sign-in';
const projectsButtonKey = 'teams.link-expired-dialog.go-to-projects';

export const useLinkExpiredDialog = ({
  handleSignInDialogOpen,
}: IUseLinkExpiredDialogProps) => {
  const { push } = useHistory();

  const { hasOauthLogin, isLoggedIn } = useAuth();

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
    : [redirectToEndpoints, handleSignInDialogOpen, t(signUpButtonKey)];

  return { buttonText, handleButtonClick, handleDialogClose, hasOauthLogin };
};
