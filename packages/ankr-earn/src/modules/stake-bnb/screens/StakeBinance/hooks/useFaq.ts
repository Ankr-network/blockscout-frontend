import { useMemo } from 'react';

import { t, tHTML, tHTMLWithRouter } from 'common';

import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';
import { IFaqItem } from 'modules/common/components/Faq';
import { Token } from 'modules/common/types/token';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';

import { useFetchStats } from '../../../hooks/useFetchStats';
import { useRedeemData } from '../../../hooks/useRedeemData';

export const useFaq = (): IFaqItem[] => {
  const { stats } = useFetchStats();

  const { redeemPeriod, redeemValue } = useRedeemData();

  const aBNBbLink: string = useMemo(
    () => BoostRoutes.tradingCockpit.generatePath(Token.BNB, Token.aBNBb),
    [],
  );

  return useLocaleMemo(
    (): IFaqItem[] => [
      {
        question: t('stake-bnb.faq.question-1'),
        answer: tHTML('stake-bnb.faq.answer-1'),
      },
      {
        question: t('stake-bnb.faq.question-2'),
        answer: t('stake-bnb.faq.answer-2', {
          total: stats ? stats.minStake.plus(stats.relayerFee) : 1,
          minStake: stats?.minStake ?? 1,
          relayerFee: stats?.relayerFee ?? 0,
        }),
      },
      {
        question: t('stake-bnb.faq.question-3'),
        answer: tHTML('stake-bnb.faq.answer-3'),
      },
      {
        question: t('stake-bnb.faq.question-4'),
        answer: t('stake-bnb.faq.answer-4'),
      },
      {
        question: t('stake-bnb.faq.question-5'),
        answer: t('stake-bnb.faq.answer-5', {
          period: redeemPeriod,
          value: redeemValue,
        }),
      },
      {
        question: t('stake-bnb.faq.question-6'),
        answer: tHTML('stake-bnb.faq.answer-6'),
      },
      {
        question: t('stake-bnb.faq.question-7'),
        answer: t('stake-bnb.faq.answer-7'),
      },
      {
        question: t('stake-bnb.faq.question-8'),
        answer: t('stake-bnb.faq.answer-8'),
      },
      {
        question: t('stake-bnb.faq.question-9'),
        answer: t('stake-bnb.faq.answer-9'),
      },
      {
        question: t('stake-bnb.faq.question-10'),
        answer: t('stake-bnb.faq.answer-10'),
      },
      {
        question: t('stake-bnb.faq.question-11'),
        answer: tHTMLWithRouter('stake-bnb.faq.answer-11', {
          aBNBbLink,
        }),
      },
      {
        question: t('stake-bnb.faq.question-12'),
        answer: t('stake-bnb.faq.answer-12'),
      },
    ],
    [redeemPeriod, redeemValue, stats, aBNBbLink],
  );
};
