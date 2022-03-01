import { useMemo } from 'react';

import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';
import { IFaqItem } from 'modules/common/components/Faq';
import { Token } from 'modules/common/types/token';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t, tHTML } from 'modules/i18n/utils/intl';

import { useFetchStats } from '../../../hooks/useFetchStats';
import { useRedeemData } from '../../../hooks/useRedeemData';

export const useFaq = (): IFaqItem[] => {
  const { stats } = useFetchStats();

  const { redeemPeriod, redeemValue } = useRedeemData();

  const tradeLink = useMemo(
    () => BoostRoutes.tradingCockpit.generatePath(Token.AVAX, Token.aAVAXb),
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
        answer: t('stake-avax.faq.answer-3', {
          value: redeemValue,
          period: redeemPeriod,
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
        answer: t('stake-avax.faq.answer-6'),
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
        answer: tHTML('stake-avax.faq.answer-9', {
          link: tradeLink,
        }),
      },
    ],
    [redeemPeriod, redeemValue, stats?.minimumStake, tradeLink],
  );
};
