import {
  TeamInvitationFormProps,
  TeamInvitationFormWithSignInButtonProps,
} from '../types';

export const hasSignInButton = (
  props: TeamInvitationFormProps,
): props is TeamInvitationFormWithSignInButtonProps =>
  'onSignInWithAnotherEmail' in props;
