import { useEffect } from 'react';

import { t } from 'modules/i18n/utils/intl';

export const useMetatags = (chainId: string) => {
  useEffect(() => {
    const name = chainId.charAt(0).toUpperCase() + chainId.slice(1);
    const descriptionTag = document.getElementById(
      'meta-description',
    ) as HTMLMetaElement;

    document.title = t('chain-item.meta.title', {
      name,
    });

    if (descriptionTag) {
      descriptionTag.content = t('chain-item.meta.description', {
        name,
      });
    }

    return () => {
      document.title = t('meta.title');

      if (descriptionTag) {
        descriptionTag.content = t('meta.description');
      }
    };
  }, [chainId]);
};
