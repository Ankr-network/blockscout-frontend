import { useMemo } from 'react';

import { t, tHTML } from 'common';

import { IFaqItem } from 'modules/common/components/Faq';
import { Token } from 'modules/common/types/token';
import { RoutesConfig as DefiRoutes } from 'modules/defi-aggregator/Routes';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';

import { useFetchStats } from '../../../hooks/useFetchStats';

export const useFaq = (): IFaqItem[] => {
  const { stats } = useFetchStats();

  const tradeLink = useMemo(
    () => DefiRoutes.defi.generatePath(Token.aAVAXb),
    [],
  );

  return useLocaleMemo(
    () => [
      {
        question: t('stake-avax.faq.question-1'),
        answer: tHTML('stake-avax.faq.answer-1'),
      },
      {
        question: t('stake-avax.faq.question-2'),
        answer: t('stake-avax.faq.answer-2', {
          value: stats?.minimumStake ?? 1,
        }),
      },
      {
        question: t('stake-avax.faq.question-3'),
        answer: t('stake-avax.faq.answer-3'),
      },
      {
        question: t('stake-avax.faq.question-4'),
        answer: t('stake-avax.faq.answer-4'),
      },
      {
        question: t('stake-avax.faq.question-5'),
        answer: t('stake-avax.faq.answer-5'),
      },
      {
        question: t('stake-avax.faq.question-6'),
        answer: t('stake-avax.faq.answer-6'),
      },
      {
        question: t('stake-avax.faq.question-7'),
        answer: tHTML('stake-avax.faq.answer-7'),
      },
      {
        question: t('stake-avax.faq.question-8'),
        answer: tHTML('stake-avax.faq.answer-8'),
      },
      {
        question: t('stake-avax.faq.question-9'),
        answer: tHTML('stake-avax.faq.answer-9', {
          link: tradeLink,
        }),
      },
    ],
    [stats?.minimumStake, tradeLink],
  );
};
