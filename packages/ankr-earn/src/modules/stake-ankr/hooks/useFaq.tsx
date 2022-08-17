import { useQuery } from '@redux-requests/react';

import { t, tHTML } from 'common';

import { IFaqItem } from 'modules/common/components/Faq';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { fetchStats } from 'modules/stake-matic/eth/actions/fetchStats';

export const useFaq = (): IFaqItem[] => {
  const { data: fetchStatsData } = useQuery({
    type: fetchStats,
  });

  const faqItems = useLocaleMemo(
    () => [
      {
        question: t('stake-ankr.faq.question-1'),
        answer: t('stake-ankr.faq.answer-1'),
      },
      {
        question: t('stake-ankr.faq.question-2'),
        answer: t('stake-ankr.faq.answer-2'),
      },
      {
        question: t('stake-ankr.faq.question-3'),
        answer: t('stake-ankr.faq.answer-3'),
      },
      {
        question: t('stake-ankr.faq.question-4'),
        answer: t('stake-ankr.faq.answer-4'),
      },
      {
        question: t('stake-ankr.faq.question-5'),
        answer: tHTML('stake-ankr.faq.answer-5'),
      },
      {
        question: t('stake-ankr.faq.question-6'),
        answer: t('stake-ankr.faq.answer-6'),
      },
      {
        question: t('stake-ankr.faq.question-7'),
        answer: t('stake-ankr.faq.answer-7'),
      },
      {
        question: t('stake-ankr.faq.question-8'),
        answer: t('stake-ankr.faq.answer-8'),
      },
      {
        question: t('stake-ankr.faq.question-9'),
        answer: t('stake-ankr.faq.answer-9'),
      },
      {
        question: t('stake-ankr.faq.question-10'),
        answer: t('stake-ankr.faq.answer-10'),
      },
      {
        question: t('stake-ankr.faq.question-11'),
        answer: t('stake-ankr.faq.answer-11'),
      },
    ],
    [fetchStatsData],
  );

  return faqItems;
};
