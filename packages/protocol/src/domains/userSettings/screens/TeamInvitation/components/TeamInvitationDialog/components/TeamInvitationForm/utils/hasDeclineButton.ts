import {
  TeamInvitationFormProps,
  TeamInvitationFormWithDeclineButtonProps,
} from '../types';

export const hasDeclineButton = (
  props: TeamInvitationFormProps,
): props is TeamInvitationFormWithDeclineButtonProps => 'onDecline' in props;
