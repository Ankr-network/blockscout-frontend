import { useQuery } from '@redux-requests/react';
import { IFaqItem } from 'modules/common/components/Faq';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { fetchStats } from 'modules/stake-bnb/actions/fetchStats';

export const useFaq = () => {
  const { data: fetchStatsData } = useQuery({
    type: fetchStats,
  });

  const faqItems: IFaqItem[] = useLocaleMemo(
    () => [
      {
        question: t('stake-bnb.faq.question-1'),
        answer: t('stake-bnb.faq.answer-1'),
      },
      {
        question: t('stake-bnb.faq.question-2'),
        answer: t('stake-bnb.faq.answer-2', {
          value: fetchStatsData?.minimumStake ?? 1,
        }),
      },
      {
        question: t('stake-bnb.faq.question-3'),
        answer: t('stake-bnb.faq.answer-3'),
      },
      {
        question: t('stake-bnb.faq.question-4'),
        answer: t('stake-bnb.faq.answer-4'),
      },
      {
        question: t('stake-bnb.faq.question-5'),
        answer: t('stake-bnb.faq.answer-5'),
      },
      {
        question: t('stake-bnb.faq.question-6'),
        answer: t('stake-bnb.faq.answer-6'),
      },
      {
        question: t('stake-bnb.faq.question-7'),
        answer: tHTML('stake-bnb.faq.answer-7'),
      },
    ],
    [fetchStatsData],
  );

  return faqItems;
};
