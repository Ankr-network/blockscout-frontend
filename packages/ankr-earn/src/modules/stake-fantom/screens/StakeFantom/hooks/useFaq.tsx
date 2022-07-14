import { useQuery } from '@redux-requests/react';

import { t, tHTML, tHTMLWithRouter } from 'common';

import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';
import { IFaqItem } from 'modules/common/components/Faq';
import { DOCS_DEFI_DEX_LINK, DOCS_DEFI_FARM_LINK } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { getCommonData } from 'modules/stake-fantom/actions/getCommonData';
import { FANTOM_UNSTAKE_PERIOD } from 'modules/stake-fantom/const';

const tradeLink: string = BoostRoutes.tradingCockpit.generatePath(
  Token.FTM,
  Token.aFTMb,
);

export const useFaq = (): IFaqItem[] => {
  const { data } = useQuery({
    type: getCommonData,
  });

  const minAmount = data?.minStake.toNumber() || 0;

  const faqItems = useLocaleMemo(
    () => [
      {
        question: t('stake-fantom.faq.question-1'),
        answer: t('stake-fantom.faq.answer-1'),
      },
      {
        question: t('stake-fantom.faq.question-2'),
        answer: tHTML('stake-fantom.faq.answer-2'),
      },
      {
        question: t('stake-fantom.faq.question-3'),
        answer: t('stake-fantom.faq.answer-3', {
          value: minAmount,
        }),
      },
      {
        question: t('stake-fantom.faq.question-4'),
        answer: t('stake-fantom.faq.answer-4'),
      },
      {
        question: t('stake-fantom.faq.question-5'),
        answer: t('stake-fantom.faq.answer-5', {
          days: FANTOM_UNSTAKE_PERIOD,
        }),
      },
      {
        question: t('stake-fantom.faq.question-6'),
        answer: tHTML('stake-fantom.faq.answer-6'),
      },
      {
        question: t('stake-fantom.faq.question-7'),
        answer: tHTML('stake-fantom.faq.answer-7'),
      },
      {
        question: t('stake-fantom.faq.question-8'),
        answer: t('stake-fantom.faq.answer-8'),
      },
      {
        question: t('stake-fantom.faq.question-9'),
        answer: t('stake-fantom.faq.answer-9'),
      },
      {
        question: t('stake-fantom.faq.question-10'),
        answer: tHTML('stake-fantom.faq.answer-10'),
      },
      {
        question: t('stake-fantom.faq.question-11'),
        answer: tHTML('stake-fantom.faq.answer-11'),
      },
      {
        question: t('stake-fantom.faq.question-12'),
        answer: (
          <>
            {tHTMLWithRouter('stake-fantom.faq.answer-12.p1', {
              link: tradeLink,
            })}

            {tHTML('stake-fantom.faq.answer-12.p2', {
              link1: DOCS_DEFI_DEX_LINK,
              link2: DOCS_DEFI_FARM_LINK,
            })}
          </>
        ),
      },
      {
        question: t('stake-fantom.faq.question-13'),
        answer: tHTML('stake-fantom.faq.answer-13'),
      },
    ],
    [minAmount, tradeLink],
  );

  return faqItems;
};
