import { t } from '@ankr.com/common';

import imgNft from './assets/nft.png';
import imgQuery from './assets/query.png';
import imgToken from './assets/token.png';

export const getContent = () => [
  {
    img: imgNft,
    title: t('advanced-api.benefits.nft-api.title'),
    list: [
      t('advanced-api.benefits.nft-api.feature-1'),
      t('advanced-api.benefits.nft-api.feature-2'),
      t('advanced-api.benefits.nft-api.feature-3'),
    ],
    linkText: t('advanced-api.benefits.nft-api.linkText'),
    linkHref:
      'https://www.ankr.com/docs/advanced-api/specification/#tag/NFT-API',
  },
  {
    img: imgQuery,
    title: t('advanced-api.benefits.query-api.title'),
    list: [
      t('advanced-api.benefits.query-api.feature-1'),
      t('advanced-api.benefits.query-api.feature-2'),
      t('advanced-api.benefits.query-api.feature-3'),
      t('advanced-api.benefits.query-api.feature-4'),
      t('advanced-api.benefits.query-api.feature-5'),
    ],
    linkText: t('advanced-api.benefits.query-api.linkText'),
    linkHref:
      'https://www.ankr.com/docs/advanced-api/specification/#tag/Query-API',
  },
  {
    img: imgToken,
    title: t('advanced-api.benefits.token-api.title'),
    list: [
      t('advanced-api.benefits.token-api.feature-1'),
      t('advanced-api.benefits.token-api.feature-2'),
      t('advanced-api.benefits.token-api.feature-3'),
      t('advanced-api.benefits.token-api.feature-4'),
      t('advanced-api.benefits.token-api.feature-5'),
      t('advanced-api.benefits.token-api.feature-6'),
    ],
    linkText: t('advanced-api.benefits.token-api.linkText'),
    linkHref:
      'https://www.ankr.com/docs/advanced-api/specification/#tag/Token-API',
  },
];
