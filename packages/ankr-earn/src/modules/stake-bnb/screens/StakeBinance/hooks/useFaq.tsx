import { t, tHTML, tHTMLWithRouter } from 'common';

import { IFaqItem } from 'modules/common/components/Faq';
import {
  DOCS_DEFI_DEX_LINK,
  DOCS_DEFI_FARM_LINK,
  DOCS_DEFI_VAULTS_LINK,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { RoutesConfig as DefiRoutes } from 'modules/defi-aggregator/Routes';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';

import { useFetchStats } from '../../../hooks/useFetchStats';
import { useRedeemData } from '../../../hooks/useRedeemData';

const aBNBbLink = DefiRoutes.defi.generatePath(Token.aBNBb);
const aBNBcLink = DefiRoutes.defi.generatePath(Token.aBNBc);

export const useFaq = (): IFaqItem[] => {
  const { stats } = useFetchStats();

  const { redeemPeriod, redeemValue } = useRedeemData();

  return useLocaleMemo(
    (): IFaqItem[] => [
      {
        question: t('stake-bnb.faq.question-1'),
        answer: t('stake-bnb.faq.answer-1'),
      },
      {
        question: t('stake-bnb.faq.question-2'),
        answer: tHTML('stake-bnb.faq.answer-2'),
      },
      {
        question: t('stake-bnb.faq.question-3'),
        answer: t('stake-bnb.faq.answer-3', {
          total: stats ? stats.minStake.plus(stats.relayerFee) : 1,
          minStake: stats?.minStake ?? 1,
          relayerFee: stats?.relayerFee ?? 0,
        }),
      },
      {
        question: t('stake-bnb.faq.question-4'),
        answer: tHTML('stake-bnb.faq.answer-4'),
      },
      {
        question: t('stake-bnb.faq.question-5'),
        answer: t('stake-bnb.faq.answer-5'),
      },
      {
        question: t('stake-bnb.faq.question-6'),
        answer: t('stake-bnb.faq.answer-6', {
          period: redeemPeriod,
          value: redeemValue,
        }),
      },
      {
        question: t('stake-bnb.faq.question-7'),
        answer: tHTML('stake-bnb.faq.answer-7'),
      },
      {
        question: t('stake-bnb.faq.question-8'),
        answer: t('stake-bnb.faq.answer-8'),
      },
      {
        question: t('stake-bnb.faq.question-9'),
        answer: tHTML('stake-bnb.faq.answer-9'),
      },
      {
        question: t('stake-bnb.faq.question-10'),
        answer: t('stake-bnb.faq.answer-10'),
      },
      {
        question: t('stake-bnb.faq.question-11'),
        answer: tHTML('stake-bnb.faq.answer-11'),
      },
      {
        question: t('stake-bnb.faq.question-12'),
        answer: t('stake-bnb.faq.answer-12'),
      },
      {
        question: t('stake-bnb.faq.question-13'),
        answer: (
          <>
            {tHTMLWithRouter('stake-bnb.faq.answer-13.p1', {
              link1: aBNBbLink,
              link2: aBNBcLink,
            })}

            {tHTML('stake-bnb.faq.answer-13.p2', {
              link1: DOCS_DEFI_DEX_LINK,
              link2: DOCS_DEFI_FARM_LINK,
              link3: DOCS_DEFI_VAULTS_LINK,
            })}
          </>
        ),
      },
    ],
    [redeemPeriod, redeemValue, stats],
  );
};
