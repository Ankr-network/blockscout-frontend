import { useEffect } from 'react';
import { t } from 'modules/i18n/utils/intl';
import { INDEX_PATH, PATH_CHAIN_DETAILS } from 'domains/chains/routes';
import { PATH_PROVIDERS } from 'domains/nodeProviders/Routes';
import { isMatchedPath } from 'modules/common/utils/isMatchedPath';

const PROTOCOL_URL = 'https://www.ankr.com/protocol';

export const getChainName = (chainId: string) => {
  let name = chainId.charAt(0).toUpperCase() + chainId.slice(1);
  if (chainId === 'eth') {
    name = 'Ethereum';
  } else if (chainId === 'bsc') {
    name = 'BSC';
  }
  return name;
};

const getLocation = (pathname: string): string => {
  let location = '';

  const isChainDetailsPath = isMatchedPath(
    pathname,
    PATH_CHAIN_DETAILS,
  )?.isExact;

  if (isChainDetailsPath) {
    if (pathname === `${INDEX_PATH}eth/`) {
      location = 'chain-item-eth.';
    } else if (pathname === `${INDEX_PATH}bsc/`) {
      location = 'chain-item-bsc.';
    } else if (pathname === `${INDEX_PATH}fantom/`) {
      location = 'chain-item-fantom.';
    } else {
      location = 'chain-item.';
    }
  } else if (pathname === INDEX_PATH) {
    location = 'public.';
  } else if (pathname === PATH_PROVIDERS) {
    location = 'providers.';
  }

  return location;
};

export const useMetatags = (pathname: string) => {
  useEffect(() => {
    const descriptionTag = document.getElementById(
      'meta-description',
    ) as HTMLMetaElement;
    const ogTitle = document.getElementById('meta-og-title') as HTMLMetaElement;
    const ogDescription = document.getElementById(
      'meta-og-description',
    ) as HTMLMetaElement;
    const twitterTitle = document.getElementById(
      'meta-twitter-title',
    ) as HTMLMetaElement;
    const twitterDescription = document.getElementById(
      'meta-twitter-description',
    ) as HTMLMetaElement;
    const ogURL = document.getElementById('meta-og-url') as HTMLMetaElement;
    const twitterURL = document.getElementById(
      'meta-twitter-url',
    ) as HTMLMetaElement;
    ogURL.content = PROTOCOL_URL + pathname;
    twitterURL.content = PROTOCOL_URL + pathname;

    const location = getLocation(pathname);

    let name = '';
    if (location.indexOf('chain-item') > -1) {
      name = getChainName(
        pathname.substring(INDEX_PATH.length, pathname.length),
      );
    }

    document.title = t(`meta.${location}title`, { chainId: name });

    if (descriptionTag) {
      descriptionTag.content = t(`meta.${location}description`, {
        chainId: name,
      });
    }

    if (ogTitle) {
      ogTitle.content = t(`meta.${location}og-title`, { chainId: name });
    }

    if (ogDescription) {
      ogDescription.content = t(`meta.${location}og-description`, {
        chainId: name,
      });
    }

    if (twitterTitle) {
      twitterTitle.content = t(`meta.${location}og-title`, { chainId: name });
    }

    if (twitterDescription) {
      twitterDescription.content = t(`meta.${location}og-description`, {
        chainId: name,
      });
    }

    return () => {};
  }, [pathname]);
};
