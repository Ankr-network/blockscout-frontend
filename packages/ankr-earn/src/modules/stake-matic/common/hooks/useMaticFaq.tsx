import { useQuery } from '@redux-requests/react';

import { t, tHTML, tHTMLWithRouter } from 'common';

import { IFaqItem } from 'modules/common/components/Faq';
import {
  DOCS_DEFI_FARM_LINK,
  DOCS_DEFI_POOLS_LINK,
  DOCS_DEFI_VAULTS_LINK,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { RoutesConfig } from 'modules/defi-aggregator/Routes';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { fetchStats as fetchMaticEthStats } from 'modules/stake-matic/eth/actions/fetchStats';

import { UNSTAKE_PERIOD } from '../const';

export const useMaticFaq = (): IFaqItem[] => {
  const { data: maticEthStats } = useQuery({
    type: fetchMaticEthStats,
  });

  return useLocaleMemo<IFaqItem[]>(
    () => [
      {
        question: t('stake-matic-common.faq.question-1'),
        answer: tHTML('stake-matic-common.faq.answer-1'),
      },
      {
        question: t('stake-matic-common.faq.question-2'),
        answer: t('stake-matic-common.faq.answer-2', {
          value: maticEthStats?.minimumStake.toFormat() ?? 1,
        }),
      },
      {
        question: t('stake-matic-common.faq.question-3'),
        answer: t('stake-matic-common.faq.answer-3'),
      },
      {
        question: t('stake-matic-common.faq.question-4'),
        answer: tHTML('stake-matic-common.faq.answer-4', {
          period: UNSTAKE_PERIOD,
        }),
      },
      {
        question: t('stake-matic-common.faq.question-5'),
        answer: tHTML('stake-matic-common.faq.answer-5', {
          period: UNSTAKE_PERIOD,
        }),
      },
      {
        question: t('stake-matic-common.faq.question-6'),
        answer: tHTML('stake-matic-common.faq.answer-6'),
      },
      {
        question: t('stake-matic-common.faq.question-7'),
        answer: tHTML('stake-matic-common.faq.answer-7'),
      },
      {
        question: t('stake-matic-common.faq.question-8'),
        answer: tHTML('stake-matic-common.faq.answer-8'),
      },
      {
        question: t('stake-matic-common.faq.question-9'),
        answer: tHTML('stake-matic-common.faq.answer-9'),
      },
      {
        question: t('stake-matic-common.faq.question-10'),
        answer: tHTML('stake-matic-common.faq.answer-10'),
      },
      {
        question: t('stake-matic-common.faq.question-11'),
        answer: t('stake-matic-common.faq.answer-11'),
      },
      {
        question: t('stake-matic-common.faq.question-12'),
        answer: (
          <>
            <p>{t('stake-matic-common.faq.answer-12.title-trade')}</p>

            <ul>
              <li>
                {tHTMLWithRouter(
                  'stake-matic-common.faq.answer-12.list-trade.bond',
                  {
                    link: RoutesConfig.defi.generatePath(Token.aMATICb),
                  },
                )}
              </li>

              <li>
                {tHTMLWithRouter(
                  'stake-matic-common.faq.answer-12.list-trade.cert',
                  {
                    link: RoutesConfig.defi.generatePath(Token.aMATICc),
                  },
                )}
              </li>
            </ul>

            <p>{t('stake-matic-common.faq.answer-12.title-use')}</p>

            <ul>
              <li>
                {tHTML('stake-matic-common.faq.answer-12.list-use.pools', {
                  link: DOCS_DEFI_POOLS_LINK,
                })}
              </li>

              <li>
                {tHTML('stake-matic-common.faq.answer-12.list-use.farm', {
                  link: DOCS_DEFI_FARM_LINK,
                })}
              </li>

              <li>
                {tHTML('stake-matic-common.faq.answer-12.list-use.vaults', {
                  link: DOCS_DEFI_VAULTS_LINK,
                })}
              </li>
            </ul>
          </>
        ),
      },
      {
        question: t('stake-matic-common.faq.question-13'),
        answer: tHTML('stake-matic-common.faq.answer-13'),
      },
    ],
    [maticEthStats?.minimumStake],
  );
};
