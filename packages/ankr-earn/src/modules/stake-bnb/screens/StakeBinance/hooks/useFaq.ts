import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';
import { IFaqItem } from 'modules/common/components/Faq';
import { featuresConfig } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { useMemo } from 'react';
import { useFetchStats } from '../../../hooks/useFetchStats';
import { useRedeemData } from '../../../hooks/useRedeemData';

export const useFaq = (): IFaqItem[] => {
  const { stats } = useFetchStats();

  const { redeemPeriod, redeemValue } = useRedeemData();

  const tradeLink: string = useMemo(
    () => BoostRoutes.tradingCockpit.generatePath(Token.BNB, Token.aBNBb),
    [],
  );

  return useLocaleMemo((): IFaqItem[] => {
    const items: IFaqItem[] = [
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
    ];

    if (featuresConfig.isActiveBNBTradeLink) {
      items.push({
        question: t('stake-bnb.faq.question-9'),
        answer: tHTML('stake-bnb.faq.answer-9', {
          link: tradeLink,
        }),
      });
    }

    return items;
  }, [redeemPeriod, redeemValue, stats?.minimumStake, tradeLink]);
};
