import { selectHasReferralBonusBanner } from 'modules/referralProgram/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useCheckDealDeposit } from 'domains/account/hooks/useCheckDealDeposit';
import { useCheckPAYGDeposit } from 'domains/account/hooks/useCheckPAYGDeposit';
import { useReferrer } from 'modules/referralProgram/hooks/useReferrer';

export const useReferralBonusBanner = () => {
  const { referrer } = useReferrer({ skipFetching: true });

  const from = referrer?.joined_at ?? 0;

  useCheckPAYGDeposit({ from, skipFetching: !from });
  useCheckDealDeposit({ from, skipFetching: !from });

  const hasReferralBonusBanner = useAppSelector(state =>
    selectHasReferralBonusBanner(state, { from }),
  );

  return { hasReferralBonusBanner };
};
