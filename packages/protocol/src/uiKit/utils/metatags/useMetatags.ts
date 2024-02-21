import { Theme } from '@mui/material';
import { t } from '@ankr.com/common';
import { useEffect } from 'react';
import { INDEX_PATH } from 'routes/constants';

import { ADVANCED_API_PATH } from 'domains/advancedApi/routes';
import { selectBeacons } from 'domains/chains/store/chainsSlice';
import { useAppSelector } from 'store/useAppSelector';
import { ChainID } from 'modules/chains/types';
import { removeCanonicalTag } from 'uiKit/utils/metatags/removeCanonicalTag';

import { getChainName } from './useMetatagsUtils';
import packageJson from '../../../../package.json';

export const PROTOCOL_URL = `https://www.ankr.com${packageJson.homepage}`;

export const LINK_CANONICAL_PARAM = 'canonical';
export const LINK_CANONICAL_SELECTOR = `link[rel="${LINK_CANONICAL_PARAM}"]`;
export const META_ROBOTS_CONTENT_PARAM = 'content';
export const META_ROBOTS_NAME_PARAM = 'robots';
export const META_ROBOTS_SELECTOR = `meta[name="${META_ROBOTS_NAME_PARAM}"]`;

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

  const isIndexPath = rawPathname === INDEX_PATH;

  const pathname = isIndexPath ? rawPathname : rawPathname.replace(/\/$/, '');

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
  }, [chainsRoutes, currentThemeColor, beacons, pathname]);

  /* setting link canonical by default */
  useEffect(() => {
    removeCanonicalTag();

    const newCanonicalTag: HTMLLinkElement | null =
      document.createElement('link');

    newCanonicalTag.rel = LINK_CANONICAL_PARAM;

    const canonicalPath = `${PROTOCOL_URL + pathname}${isIndexPath ? '' : '/'}`;

    newCanonicalTag.href = canonicalPath;

    document.head.appendChild(newCanonicalTag);
  }, [chainsRoutes, rawPathname, pathname, isIndexPath]);

  /* setting meta robots by default */
  useEffect(() => {
    const metaRobotsElement = document.querySelector(META_ROBOTS_SELECTOR);

    if (metaRobotsElement) {
      metaRobotsElement.remove();
    }

    const metaRobotsTag = document.createElement('meta');

    metaRobotsTag.name = META_ROBOTS_NAME_PARAM;

    metaRobotsTag.setAttribute(META_ROBOTS_CONTENT_PARAM, 'index,follow');

    document.head.appendChild(metaRobotsTag);
  }, [pathname]);
};
