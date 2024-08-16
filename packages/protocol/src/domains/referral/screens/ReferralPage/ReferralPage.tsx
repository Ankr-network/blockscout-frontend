import { TopBanner } from './components/TopBanner';
import { useReferralPageStyles } from './useReferralPageStyles';

export const ReferralPage = () => {
  const { classes } = useReferralPageStyles();

  return (
    <div className={classes.referralPageRoot}>
      <TopBanner />
    </div>
  );
};
