import { useMemo } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { useDialog } from 'modules/common/hooks/useDialog';

import { IEmailVerificationIssueDialogProps } from '../components/EmailVerificationIssueDialog';
import { ILinkExpiredDialogProps } from '../components/LinkExpiredDialog';
import { TeamInvitationContentType } from '../constants';
import { TeamInvitationDialogContainerProps } from '../components/TeamInvitationDialogContainer';
import { useTeamInvitationContentType } from './useTeamInvitationContentType';

export const useTeamInvitationPage = () => {
  const { isLoggedIn } = useAuth();

  const contentType = useTeamInvitationContentType();

  const isExpiredLinkDialogOpened =
    contentType === TeamInvitationContentType.LinkExpired;
  const isEmailVerificationDialogOpened =
    contentType === TeamInvitationContentType.EmailVerification;
  const isTeamInvitationDialogOpened =
    contentType === TeamInvitationContentType.InvitationAcceptance;

  const expiredLinkDialog = useDialog(isExpiredLinkDialogOpened);

  const emailVerificationDialog = useDialog(isEmailVerificationDialogOpened);

  const expiredLinkDialogProps = useMemo<ILinkExpiredDialogProps>(
    () => ({
      onClose: expiredLinkDialog.onClose,
      onOpen: expiredLinkDialog.onOpen,
      open: expiredLinkDialog.isOpened,
    }),
    [expiredLinkDialog],
  );

  const emailVerificationDialogProps =
    useMemo<IEmailVerificationIssueDialogProps>(
      () => ({
        onClose: emailVerificationDialog.onClose,
        onOpen: emailVerificationDialog.onOpen,
        open: emailVerificationDialog.isOpened,
      }),
      [emailVerificationDialog],
    );

  const teamInvitationDialogProps = useMemo<TeamInvitationDialogContainerProps>(
    () => ({ isOpened: isTeamInvitationDialogOpened }),
    [isTeamInvitationDialogOpened],
  );

  return {
    emailVerificationDialogProps,
    expiredLinkDialogProps,
    isLoggedIn,
    teamInvitationDialogProps,
  };
};
