import { trackClickMaxStake } from 'modules/analytics/tracking-actions/trackClickMaxStake';

interface IUseStakeFormAnalytics {
  onMaxClick: () => void;
}

export const useStakeFormAnalytics = (
  tokenName: string,
  amountToken: string,
): IUseStakeFormAnalytics => {
  const onMaxClick = () => {
    trackClickMaxStake({
      tokenName,
      amountToken,
    });
  };

  return {
    onMaxClick,
  };
};
