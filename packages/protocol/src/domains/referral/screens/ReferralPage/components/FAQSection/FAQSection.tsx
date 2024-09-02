import { Locale } from 'modules/i18n';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { FAQAccordion } from './components/FAQAccordion';
import { FAQAccordionDetails } from './components/FAQAccordionDetails';
import { FAQAccordionSummary } from './components/FAQAccordionSummary';
import { Section } from '../Section';
import { Widget } from '../Widget';
import { faqSectionTranslation } from './translation';
import { useFAQSectionStyles } from './useFAQSectionStyles';

type Key = keyof Omit<typeof faqSectionTranslation[Locale.en], 'title'>;

const order: Key[] = [
  'definition',
  'eligibility',
  'rewardsEarning',
  'rewardsDefinition',
  'firstDeposit',
  'limitation',
  'usage',
  'expiration',
];

export const FAQSection = () => {
  const { classes } = useFAQSectionStyles();
  const { keys, t, tHTML } = useTranslation(faqSectionTranslation);

  return (
    <Section title={t(keys.title)}>
      <Widget className={classes.root}>
        {order.map(key => (
          <FAQAccordion key={key}>
            <FAQAccordionSummary>{t(keys[key].question)}</FAQAccordionSummary>
            <FAQAccordionDetails>{tHTML(keys[key].answer)}</FAQAccordionDetails>
          </FAQAccordion>
        ))}
      </Widget>
    </Section>
  );
};
