import { EmailConfirmationStatus, IEmailResponse } from 'multirpc-sdk';

type EmailBinding = IEmailResponse;

export const makeEmailStatus = (
  bindings: EmailBinding[] | null | undefined,
) => {
  const map: Record<EmailConfirmationStatus, Partial<EmailBinding[]>> = {
    [EmailConfirmationStatus.CONFIRMED]: [],
    [EmailConfirmationStatus.PENDING]: [],
    [EmailConfirmationStatus.DELETED]: [],
  };

  (bindings || []).forEach(binding => {
    map[binding.status].push(binding);
  });

  const confirmedEmail = map[EmailConfirmationStatus.CONFIRMED][0]?.email;
  const confirmedAddress = map[EmailConfirmationStatus.CONFIRMED][0]?.address;
  const isEmailConfirmed = !!bindings?.length && !!confirmedEmail;

  const pendingEmail = map[EmailConfirmationStatus.PENDING][0]?.email;
  const pendingAddress = map[EmailConfirmationStatus.PENDING][0]?.address;
  const isEmailPending = !!bindings?.length && !!pendingEmail;

  const lastLinkExpiredEmail = map[EmailConfirmationStatus.DELETED][0]?.email;
  const isEmailLinkExpired =
    !isEmailConfirmed && !isEmailPending && !!lastLinkExpiredEmail;

  const isEmailNotUsed =
    !!bindings && !isEmailConfirmed && !isEmailPending && !isEmailLinkExpired;

  return {
    confirmedEmail,
    confirmedAddress,
    isEmailConfirmed,

    pendingEmail,
    pendingAddress,
    isEmailPending,

    lastLinkExpiredEmail,
    isEmailLinkExpired,

    isEmailNotUsed,
  };
};
