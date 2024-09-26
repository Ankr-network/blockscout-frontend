import { BonusHistorySection } from './components/BonusHistorySection';
import { BonusPurposeSection } from './components/BonusPurposeSection';
import { FAQSection } from './components/FAQSection';
import { InviteWidgets } from './components/InviteWidgets';
import { SummaryWidgets } from './components/SummaryWidgets';
import { TermsSection } from './components/TermsSection';
import { TopBanner } from './components/TopBanner';
import { useReferralsPageStyles } from './useReferralsPageStyles';

export const ReferralsPage = () => {
  const { classes } = useReferralsPageStyles();

  return (
    <div className={classes.root}>
      <TopBanner />
      <SummaryWidgets />
      <InviteWidgets />
      <BonusHistorySection />
      <BonusPurposeSection />
      <FAQSection />
      <TermsSection />
    </div>
  );
};
