import { USDPaymentReason } from 'domains/projects/const';
import { useReasonParam } from './usePaymentReason';

export const useIsWhitelistReason = () => {
  const reason = useReasonParam();

  return reason === USDPaymentReason.Whitelist;
};
