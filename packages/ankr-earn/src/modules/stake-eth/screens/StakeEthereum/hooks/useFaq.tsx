import { useQuery } from '@redux-requests/react';

import { t, tHTML, tHTMLWithRouter } from 'common';

import { RoutesConfig } from 'modules/boost/Routes';
import { IFaqItem } from 'modules/common/components/Faq';
import {
  DOCS_DEFI_DEX_LINK,
  DOCS_DEFI_FARM_LINK,
  DOCS_STAKE_ETH_LINK,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';
import { ETH_STAKING_AMOUNT_STEP } from 'modules/stake-eth/const';

const tradelink = RoutesConfig.tradingCockpit.generatePath(
  Token.aETHb,
  Token.ETH,
);

export const useFaq = (): IFaqItem[] => {
  const { data } = useQuery({ type: getCommonData });

  return useLocaleMemo<IFaqItem[]>(
    () => [
      {
        question: t('stake-ethereum.faq.question-1'),
        answer: tHTML('stake-ethereum.faq.answer-1', {
          link: DOCS_STAKE_ETH_LINK,
        }),
      },
      {
        question: t('stake-ethereum.faq.question-2'),
        answer: t('stake-ethereum.faq.answer-2', {
          value: data?.minStake ?? 0,
        }),
      },
      {
        question: t('stake-ethereum.faq.question-3'),
        answer: t('stake-ethereum.faq.answer-3', {
          step: ETH_STAKING_AMOUNT_STEP,
          stepx2: ETH_STAKING_AMOUNT_STEP * 2,
          stepx3: ETH_STAKING_AMOUNT_STEP * 3,
        }),
      },
      {
        question: t('stake-ethereum.faq.question-4'),
        answer: t('stake-ethereum.faq.answer-4'),
      },
      {
        question: t('stake-ethereum.faq.question-5'),
        answer: t('stake-ethereum.faq.answer-5'),
      },
      {
        question: t('stake-ethereum.faq.question-6'),
        answer: tHTML('stake-ethereum.faq.answer-6'),
      },
      {
        question: t('stake-ethereum.faq.question-7'),
        answer: t('stake-ethereum.faq.answer-7'),
      },
      {
        question: t('stake-ethereum.faq.question-8'),
        answer: t('stake-ethereum.faq.answer-8'),
      },
      {
        question: t('stake-ethereum.faq.question-9'),
        answer: tHTML('stake-ethereum.faq.answer-9'),
      },
      {
        question: t('stake-ethereum.faq.question-10'),
        answer: t('stake-ethereum.faq.answer-10'),
      },
      {
        question: t('stake-ethereum.faq.question-11'),
        answer: (
          <>
            <p>
              {tHTMLWithRouter('stake-ethereum.faq.answer-11.p1', {
                link: tradelink,
              })}
            </p>

            <p>{tHTML('stake-ethereum.faq.answer-11.p2')}</p>

            <ul>
              <li>
                {tHTML('stake-ethereum.faq.answer-11.p3', {
                  link: DOCS_DEFI_DEX_LINK,
                })}
              </li>

              <li>
                {tHTML('stake-ethereum.faq.answer-11.p4', {
                  link: DOCS_DEFI_FARM_LINK,
                })}
              </li>
            </ul>
          </>
        ),
      },
    ],
    [data?.minStake],
  );
};
