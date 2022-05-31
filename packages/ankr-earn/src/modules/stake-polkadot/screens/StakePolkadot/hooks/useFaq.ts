import { useQuery } from '@redux-requests/react';
import { useMemo } from 'react';

import { t, tHTML } from 'common';

import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';
import { IFaqItem } from 'modules/common/components/Faq';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';

import { fetchStakeStats } from '../../../actions/fetchStakeStats';
import {
  EPolkadotNetworks,
  TPolkadotETHToken,
  TPolkadotToken,
} from '../../../types';
import { getRedeemPeriod } from '../../../utils/getRedeemPeriod';

interface IUseFaqProps {
  ethToken: TPolkadotETHToken;
  network: EPolkadotNetworks;
  polkadotToken: TPolkadotToken;
}

export const useFaq = ({
  ethToken,
  network,
  polkadotToken,
}: IUseFaqProps): IFaqItem[] => {
  const { data: stats } = useQuery({
    type: fetchStakeStats,
  });

  const tradeLink = useMemo(
    () => BoostRoutes.tradingCockpit.generatePath(ethToken, polkadotToken),
    [ethToken, polkadotToken],
  );

  return useLocaleMemo(
    () => [
      {
        question: t('stake-polkadot.faq.question-1', {
          network,
        }),
        answer: t('stake-polkadot.faq.answer-1', {
          network,
        }),
      },
      {
        question: t('stake-polkadot.faq.question-2', {
          network,
        }),
        answer: tHTML('stake-polkadot.faq.answer-2', {
          network: network.toLowerCase(),
        }),
      },
      {
        question: t('stake-polkadot.faq.question-3', {
          network,
        }),
        answer: t('stake-polkadot.faq.answer-3', {
          value: stats?.minStake ?? 0,
          network,
        }),
      },
      {
        question: t('stake-polkadot.faq.question-4'),
        answer: t('stake-polkadot.faq.answer-4'),
      },
      {
        question: t('stake-polkadot.faq.question-5', {
          network,
        }),
        answer: t('stake-polkadot.faq.answer-5', {
          period: getRedeemPeriod(network),
        }),
      },
      {
        question: t('stake-polkadot.faq.question-6'),
        answer: t('stake-polkadot.faq.answer-6', {
          network,
        }),
      },
      {
        question: t('stake-polkadot.faq.question-7'),
        answer: t('stake-polkadot.faq.answer-7', {
          network,
        }),
      },
      {
        question: t('stake-polkadot.faq.question-8'),
        answer: t('stake-polkadot.faq.answer-8'),
      },
      {
        question: t('stake-polkadot.faq.question-9', {
          network,
        }),
        answer: t('stake-polkadot.faq.answer-9'),
      },
      {
        question: t('stake-polkadot.faq.question-10'),
        answer: t('stake-polkadot.faq.answer-10', {
          network,
        }),
      },
      {
        question: t('stake-polkadot.faq.question-11', {
          network,
        }),
        answer: tHTML('stake-polkadot.faq.answer-11', {
          link: tradeLink,
        }),
      },
    ],
    [network, stats?.minStake, tradeLink],
  );
};
