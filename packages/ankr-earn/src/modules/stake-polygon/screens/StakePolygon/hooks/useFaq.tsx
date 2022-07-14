import { useQuery } from '@redux-requests/react';

import { t, tHTML, tHTMLWithRouter } from 'common';

import { RoutesConfig } from 'modules/boost/Routes';
import { IFaqItem } from 'modules/common/components/Faq';
import { DOCS_DEFI_DEX_LINK, DOCS_DEFI_FARM_LINK } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { fetchStats } from 'modules/stake-polygon/actions/fetchStats';

const tradeLink = RoutesConfig.tradingCockpit.generatePath(
  Token.aMATICb,
  Token.MATIC,
);

export const useFaq = (): IFaqItem[] => {
  const { data: fetchStatsData } = useQuery({
    type: fetchStats,
  });

  const faqItems = useLocaleMemo(
    () => [
      {
        question: t('stake-polygon.faq.question-1'),
        answer: tHTML('stake-polygon.faq.answer-1'),
      },
      {
        question: t('stake-polygon.faq.question-2'),
        answer: t('stake-polygon.faq.answer-2', {
          value: fetchStatsData?.minimumStake ?? 1,
        }),
      },
      {
        question: t('stake-polygon.faq.question-3'),
        answer: t('stake-polygon.faq.answer-3'),
      },
      {
        question: t('stake-polygon.faq.question-4'),
        answer: t('stake-polygon.faq.answer-4'),
      },
      {
        question: t('stake-polygon.faq.question-5'),
        answer: tHTML('stake-polygon.faq.answer-5'),
      },
      {
        question: t('stake-polygon.faq.question-6'),
        answer: tHTML('stake-polygon.faq.answer-6'),
      },
      {
        question: t('stake-polygon.faq.question-7'),
        answer: tHTML('stake-polygon.faq.answer-7'),
      },
      {
        question: t('stake-polygon.faq.question-8'),
        answer: t('stake-polygon.faq.answer-8'),
      },
      {
        question: t('stake-polygon.faq.question-9'),
        answer: tHTML('stake-polygon.faq.answer-9'),
      },
      {
        question: t('stake-polygon.faq.question-10'),
        answer: t('stake-polygon.faq.answer-10'),
      },
      {
        question: t('stake-polygon.faq.question-11'),
        answer: (
          <>
            {tHTMLWithRouter('stake-polygon.faq.answer-11.p1', {
              link: tradeLink,
            })}

            {tHTML('stake-polygon.faq.answer-11.p2', {
              link1: DOCS_DEFI_DEX_LINK,
              link2: DOCS_DEFI_FARM_LINK,
            })}
          </>
        ),
      },
      {
        question: t('stake-polygon.faq.question-12'),
        answer: tHTML('stake-polygon.faq.answer-12'),
      },
    ],
    [fetchStatsData],
  );

  return faqItems;
};
