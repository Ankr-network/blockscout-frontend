import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { configFromEnv } from 'modules/api/config';
import { Milliseconds } from 'modules/common/types';
import { Token } from 'modules/common/types/token';

interface IFAQResItem {
  answer: string;
  // eslint-disable-next-line camelcase
  created_at: string;
  id: number;
  // eslint-disable-next-line camelcase
  published_at: string;
  question: string;
  // eslint-disable-next-line camelcase
  updated_at: string;
}

export interface IFAQItem {
  answer: string;
  question: string;
}

const BASE_URL = configFromEnv().gatewayConfig.strapiUrl;
const CACHE_TIME: Milliseconds = 600_000; // 10 min

const getStrapiURL = (token: Token): string => {
  switch (token) {
    case Token.AVAX:
      return '/faq-avalanche-items';

    case Token.BNB:
      return '/faq-binance-items';

    case Token.DOT:
      return '/faq-polkadot-items';

    case Token.ETH:
      return '/faq-ethereum-items';

    case Token.FTM:
      return '/faq-fantom-items';

    case Token.KSM:
      return '/faq-kusama-items';

    case Token.MATIC:
      return '/faq-polygon-items';

    case Token.WND:
      return '/faq-westend-items';

    case Token.asETHc:
      return '/faq-ssv-items';

    case Token.mGNO:
      return '/faq-m-gno-items';

    case Token.ANKR:
    default:
      return '/faq-ankr-items';
  }
};

export const getFAQ = createAction<
  RequestAction<IFAQResItem[], IFAQItem[]>,
  [Token]
>('stake/getFAQ', token => ({
  request: {
    baseURL: BASE_URL,
    url: getStrapiURL(token),
  },
  meta: {
    cache: CACHE_TIME,
    driver: 'axios',
    showNotificationOnError: true,
    getData: data =>
      data
        .sort((item1, item2): number => item1.id - item2.id)
        .map(({ answer, question }): IFAQItem => ({ answer, question })),
  },
}));
