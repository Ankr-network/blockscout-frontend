import { useMemo } from 'react';

import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';
import { IFaqItem } from 'modules/common/components/Faq';
import { Token } from 'modules/common/types/token';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t, tHTML, tHTMLWithRouter } from 'modules/i18n/utils/intl';

import { useFetchStats } from '../../../hooks/useFetchStats';
import { useRedeemData } from '../../../hooks/useRedeemData';

export const useFaq = (): IFaqItem[] => {
  const { stats } = useFetchStats();

  const { redeemPeriod, redeemValue } = useRedeemData();

  const tradeLink: string = useMemo(
    // TODO Please to add fix for it (BNB; trading-cockpit)
    // () => BoostRoutes.tradingCockpit.generatePath(Token.BNB, Token.aBNBb),
    () => BoostRoutes.tradingCockpit.generatePath(Token.aETHb, Token.ETH),
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
          value: stats?.minimumStake ?? 1,
        }),
      },
      {
        question: t('stake-bnb.faq.question-3'),
        answer: t('stake-bnb.faq.answer-3', {
          value: redeemValue,
          period: redeemPeriod,
        }),
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
        answer: t('stake-bnb.faq.answer-7'),
      },
      {
        question: t('stake-bnb.faq.question-8'),
        answer: t('stake-bnb.faq.answer-8'),
      },
      {
        question: t('stake-bnb.faq.question-9'),
        answer: tHTMLWithRouter('stake-bnb.faq.answer-9', {
          link: tradeLink,
        }),
      },
    ],
    [redeemPeriod, redeemValue, stats?.minimumStake, tradeLink],
  );
};
