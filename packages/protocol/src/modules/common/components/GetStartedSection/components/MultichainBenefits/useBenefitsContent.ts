import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import imgNft from './assets/nft.png';
import imgQuery from './assets/query.png';
import imgToken from './assets/token.png';
import { multichainBenefitsTranslation } from './translation';

export const useBenefitsContent = () => {
  const { keys, t } = useTranslation(multichainBenefitsTranslation);

  const content = [
    {
      img: imgNft,
      title: t(keys.nftApi.title),
      description: t(keys.nftApi.description),
      list: [
        t(keys.nftApi.feature1),
        t(keys.nftApi.feature2),
        t(keys.nftApi.feature3),
      ],
      linkText: t(keys.nftApi.linkText),
      linkHref:
        'https://www.ankr.com/docs/advanced-api/specification/#tag/NFT-API',
    },
    {
      img: imgQuery,
      title: t(keys.queryApi.title),
      description: t(keys.queryApi.description),
      list: [
        t(keys.queryApi.feature1),
        t(keys.queryApi.feature2),
        t(keys.queryApi.feature3),
      ],
      linkText: t(keys.queryApi.linkText),
      linkHref:
        'https://www.ankr.com/docs/advanced-api/specification/#tag/Query-API',
    },
    {
      img: imgToken,
      title: t(keys.tokenApi.title),
      description: t(keys.tokenApi.description),
      list: [
        t(keys.tokenApi.feature1),
        t(keys.tokenApi.feature2),
        t(keys.tokenApi.feature3),
      ],
      linkText: t(keys.tokenApi.linkText),
      linkHref:
        'https://www.ankr.com/docs/advanced-api/specification/#tag/Token-API',
    },
  ];

  return { content, keys, t };
};
