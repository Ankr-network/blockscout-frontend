import { EmailConfirmationStatus, IEmailResponse } from 'multirpc-sdk';

type EmailBinding = IEmailResponse;

export const makeEmailStatuses = (
  bindings: EmailBinding[] | null | undefined,
) => {
  const map: Record<EmailConfirmationStatus, Partial<EmailBinding[]>> = {
    [EmailConfirmationStatus.PENDING]: [],
    [EmailConfirmationStatus.CONFIRMED]: [],
    [EmailConfirmationStatus.DELETED]: [],
  };

  (bindings || []).forEach(binding => {
    map[binding.status].push(binding);
  });

  const pendingEmail = map[EmailConfirmationStatus.PENDING][0]?.email;
  const pendingAddress = map[EmailConfirmationStatus.PENDING][0]?.address;
  const isEmailPending = !!bindings?.length && !!pendingEmail;

  const confirmedEmail = isEmailPending
    ? undefined
    : map[EmailConfirmationStatus.CONFIRMED][0]?.email;
  const confirmedAddress = isEmailPending
    ? undefined
    : map[EmailConfirmationStatus.CONFIRMED][0]?.address;
  const isEmailConfirmed = !!bindings?.length && !!confirmedEmail;

  const lastLinkExpiredEmail = map[EmailConfirmationStatus.DELETED][0]?.email;
  const lastLinkExpiredAddress =
    map[EmailConfirmationStatus.DELETED][0]?.address;
  const isEmailLinkExpired =
    !isEmailPending && !isEmailConfirmed && !!lastLinkExpiredEmail;

  const isEmailNotUsed =
    !isEmailPending && !isEmailConfirmed && !isEmailLinkExpired;

  const lastEmailUsed = pendingEmail || confirmedEmail || lastLinkExpiredEmail;
  const lastAddressUsed =
    pendingAddress || confirmedAddress || lastLinkExpiredAddress;

  return {
    pendingEmail,
    pendingAddress,
    isEmailPending,

    confirmedEmail,
    confirmedAddress,
    isEmailConfirmed,

    lastLinkExpiredEmail,
    isEmailLinkExpired,

    isEmailNotUsed,
    lastEmailUsed,
    lastAddressUsed,
  };
};
