import { INDEX_PATH } from 'domains/chains/routes';
import { ChainID } from 'modules/chains/types';
import { t } from 'modules/i18n/utils/intl';
import { useEffect } from 'react';
import packageJson from '../../../package.json';

const PROTOCOL_URL = `https://www.ankr.com${packageJson.homepage}`;

export const getChainName = (chainId: ChainID) => {
  const preparedChainId = chainId.split('_').join(' ');

  let name = preparedChainId.charAt(0).toUpperCase() + preparedChainId.slice(1);

  if (preparedChainId === 'eth') {
    name = 'Ethereum';
  } else if (preparedChainId === 'bsc') {
    name = 'BSC';
  } else if (preparedChainId === 'scrt') {
    name = 'Secret Network';
  }

  return name;
};

const getLocation = (pathname: string, chainsRoutes: string[]): string => {
  let location = '';

  if (pathname === INDEX_PATH) {
    location = 'public.';
  }

  if (chainsRoutes.some(route => pathname.includes(route))) {
    if (pathname === `${INDEX_PATH}eth`) {
      location = 'chain-item-eth.';
    } else if (pathname === `${INDEX_PATH}bsc`) {
      location = 'chain-item-bsc.';
    } else if (pathname === `${INDEX_PATH}fantom`) {
      location = 'chain-item-fantom.';
    } else {
      location = 'chain-item.';
    }
  }

  return location;
};

export const useMetatags = (rawPathname: string, chainsRoutes: string[]) => {
  useEffect(() => {
    const pathname =
      rawPathname === INDEX_PATH ? rawPathname : rawPathname.replace(/\/$/, '');

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

    const location = getLocation(pathname, chainsRoutes);

    let name = '';

    if (location.indexOf('chain-item') > -1) {
      name = getChainName(
        pathname.substring(INDEX_PATH.length, pathname.length) as ChainID,
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
  }, [rawPathname, chainsRoutes]);
};
