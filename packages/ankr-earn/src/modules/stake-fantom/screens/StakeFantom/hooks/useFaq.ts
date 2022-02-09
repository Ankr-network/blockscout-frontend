import { IFaqItem } from 'modules/common/components/Faq';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';

export const useFaq = () => {
  const faqItems: IFaqItem[] = useLocaleMemo(
    () => [
      {
        question: t('How long after unstaking can I withdraw my FTM?'),
        answer: t('1 day'),
      },
    ],
    [],
  );

  return faqItems;
};
