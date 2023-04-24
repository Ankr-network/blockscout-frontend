import { Theme } from '@mui/material';
import { t } from '@ankr.com/common';
import { useEffect } from 'react';

import { INDEX_PATH } from 'domains/chains/routes';
import { ADVANCED_API_PATH } from 'domains/advancedApi/routes';
import packageJson from '../../../../package.json';
import { selectBeacons } from 'domains/chains/store/chainsSlice';
import { useAppSelector } from 'store/useAppSelector';
import { getChainName } from './useMetatagsUtils';
import { ChainID } from 'domains/chains/types';

const PROTOCOL_URL = `https://www.ankr.com${packageJson.homepage}`;

const getLocation = (pathname: string, chainsRoutes: string[]): string => {
  let location = '';

  if (pathname === INDEX_PATH) {
    location = 'public.';
  }

  if (
    chainsRoutes.some(route => pathname.includes(route)) ||
    pathname.includes(ADVANCED_API_PATH)
  ) {
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

export const useMetatags = (
  rawPathname: string,
  chainsRoutes: string[],
  currentTheme: Theme,
) => {
  const currentThemeColor = currentTheme.palette.background.default;

  const beacons = useAppSelector(selectBeacons);

  useEffect(() => {
    const themeTag = document.getElementById('meta-theme') as HTMLMetaElement;
    themeTag.content = currentThemeColor;

    const htmlElement = document.getElementsByTagName(
      'html',
    )[0] as HTMLHtmlElement;

    const bodyElement = document.getElementsByTagName(
      'body',
    )[0] as HTMLBodyElement;

    htmlElement.style.backdropFilter = currentThemeColor;
    bodyElement.style.backgroundColor = currentThemeColor;

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
      const lastIndex = pathname.lastIndexOf('/');

      name = getChainName(
        pathname.substring(lastIndex + 1) as ChainID,
        beacons,
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
  }, [rawPathname, chainsRoutes, currentThemeColor, beacons]);
};
