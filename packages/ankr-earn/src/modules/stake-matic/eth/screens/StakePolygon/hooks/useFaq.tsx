import { useQuery } from '@redux-requests/react';

import { t, tHTML, tHTMLWithRouter } from 'common';

import { IFaqItem } from 'modules/common/components/Faq';
import { DOCS_DEFI_DEX_LINK, DOCS_DEFI_FARM_LINK } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { RoutesConfig } from 'modules/defi-aggregator/Routes';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { fetchStats } from 'modules/stake-matic/eth/actions/fetchStats';

const tradeLink = RoutesConfig.defi.generatePath(Token.aMATICb);

export const useFaq = (): IFaqItem[] => {
  const { data: fetchStatsData } = useQuery({
    type: fetchStats,
  });

  const faqItems = useLocaleMemo(
    () => [
      {
        question: t('stake-matic-eth.faq.question-1'),
        answer: tHTML('stake-matic-eth.faq.answer-1'),
      },
      {
        question: t('stake-matic-eth.faq.question-2'),
        answer: t('stake-matic-eth.faq.answer-2', {
          value: fetchStatsData?.minimumStake ?? 1,
        }),
      },
      {
        question: t('stake-matic-eth.faq.question-3'),
        answer: t('stake-matic-eth.faq.answer-3'),
      },
      {
        question: t('stake-matic-eth.faq.question-4'),
        answer: t('stake-matic-eth.faq.answer-4'),
      },
      {
        question: t('stake-matic-eth.faq.question-5'),
        answer: tHTML('stake-matic-eth.faq.answer-5'),
      },
      {
        question: t('stake-matic-eth.faq.question-6'),
        answer: tHTML('stake-matic-eth.faq.answer-6'),
      },
      {
        question: t('stake-matic-eth.faq.question-7'),
        answer: tHTML('stake-matic-eth.faq.answer-7'),
      },
      {
        question: t('stake-matic-eth.faq.question-8'),
        answer: t('stake-matic-eth.faq.answer-8'),
      },
      {
        question: t('stake-matic-eth.faq.question-9'),
        answer: tHTML('stake-matic-eth.faq.answer-9'),
      },
      {
        question: t('stake-matic-eth.faq.question-10'),
        answer: t('stake-matic-eth.faq.answer-10'),
      },
      {
        question: t('stake-matic-eth.faq.question-11'),
        answer: (
          <>
            {tHTMLWithRouter('stake-matic-eth.faq.answer-11.p1', {
              link: tradeLink,
            })}

            {tHTML('stake-matic-eth.faq.answer-11.p2', {
              link1: DOCS_DEFI_DEX_LINK,
              link2: DOCS_DEFI_FARM_LINK,
            })}
          </>
        ),
      },
      {
        question: t('stake-matic-eth.faq.question-12'),
        answer: tHTML('stake-matic-eth.faq.answer-12'),
      },
    ],
    [fetchStatsData],
  );

  return faqItems;
};
