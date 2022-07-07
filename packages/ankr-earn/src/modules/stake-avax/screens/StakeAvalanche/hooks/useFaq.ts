import { useMemo } from 'react';

import { t, tHTML, tHTMLWithRouter } from 'common';

import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';
import { IFaqItem } from 'modules/common/components/Faq';
import { Token } from 'modules/common/types/token';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';

import { useFetchStats } from '../../../hooks/useFetchStats';

export const useFaq = (): IFaqItem[] => {
  const { stats } = useFetchStats();

  const tradeLink = useMemo(
    () => BoostRoutes.tradingCockpit.generatePath(Token.aAVAXb, Token.AVAX),
    [],
  );

  return useLocaleMemo(
    () => [
      {
        question: t('stake-avax.faq.question-1'),
        answer: t('stake-avax.faq.answer-1'),
      },
      {
        question: t('stake-avax.faq.question-2'),
        answer: tHTML('stake-avax.faq.answer-2'),
      },
      {
        question: t('stake-avax.faq.question-3'),
        answer: t('stake-avax.faq.answer-3', {
          value: stats?.minimumStake ?? 1,
        }),
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
        answer: tHTML('stake-avax.faq.answer-6'),
      },
      {
        question: t('stake-avax.faq.question-7'),
        answer: t('stake-avax.faq.answer-7'),
      },
      {
        question: t('stake-avax.faq.question-8'),
        answer: t('stake-avax.faq.answer-8'),
      },
      {
        question: t('stake-avax.faq.question-9'),
        answer: t('stake-avax.faq.answer-9'),
      },
      {
        question: t('stake-avax.faq.question-10'),
        answer: tHTML('stake-avax.faq.answer-10'),
      },
      {
        question: t('stake-avax.faq.question-11'),
        answer: t('stake-avax.faq.answer-11'),
      },
      {
        question: t('stake-avax.faq.question-12'),
        answer: tHTMLWithRouter('stake-avax.faq.answer-12', {
          link: tradeLink,
        }),
      },
      {
        question: t('stake-avax.faq.question-13'),
        answer: tHTML('stake-avax.faq.answer-13'),
      },
    ],
    [stats?.minimumStake, tradeLink],
  );
};
