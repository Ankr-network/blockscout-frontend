import { t, tHTML, tHTMLWithRouter } from 'common';

import { IFaqItem } from 'modules/common/components/Faq';
import { DOCS_DEFI_DEX_LINK, DOCS_DEFI_FARM_LINK } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { RoutesConfig as DefiRoutes } from 'modules/defi-aggregator/Routes';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';

import { useFetchStats } from '../../../hooks/useFetchStats';

const tradeLink = DefiRoutes.defi.generatePath(Token.AVAX);

export const useFaq = (): IFaqItem[] => {
  const { stats } = useFetchStats();

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
        answer: (
          <>
            {tHTMLWithRouter('stake-avax.faq.answer-12.p1', {
              link: tradeLink,
            })}

            {tHTML('stake-avax.faq.answer-12.p2', {
              link1: DOCS_DEFI_DEX_LINK,
              link2: DOCS_DEFI_FARM_LINK,
            })}
          </>
        ),
      },
      {
        question: t('stake-avax.faq.question-13'),
        answer: tHTML('stake-avax.faq.answer-13'),
      },
    ],
    [stats?.minimumStake, tradeLink],
  );
};
