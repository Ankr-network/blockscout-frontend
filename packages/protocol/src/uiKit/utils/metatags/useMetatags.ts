import { Theme } from '@mui/material';
import { useEffect } from 'react';
import { INDEX_PATH } from 'routes/constants';
import { ChainID } from '@ankr.com/chains-list';

import { ADVANCED_API_PATH } from 'domains/advancedApi/routes';
import { selectBeacons } from 'domains/chains/store/chainsSlice';
import { useAppSelector } from 'store/useAppSelector';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { getChainName } from './useMetatagsUtils';
import { PROTOCOL_URL } from './const';
import { metaTranslation } from './translation';

const getLocation = (pathname: string, chainsRoutes: string[]): string => {
  let location = '';

  if (pathname === INDEX_PATH) {
    location = 'public.';
  }

  if (
    chainsRoutes.some(route => pathname.includes(route)) ||
    pathname.includes(ADVANCED_API_PATH)
  ) {
    location = 'chain-item.';
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

  const { keys, t } = useTranslation(metaTranslation);

  const pathname = (
    isIndexPath ? rawPathname : rawPathname.replace(/\/$/, '')
  ) as keyof typeof keys;

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

    const keywordsTag = document.getElementById(
      'meta-keywords',
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

    const titleKey = keys[pathname]?.title;
    const title = titleKey
      ? t(titleKey)
      : t(`meta.${location}title`, { chainId: name });

    const descriptionKey = keys[pathname]?.description;
    const description = descriptionKey
      ? t(descriptionKey)
      : t(`meta.${location}description`, {
          chainId: name,
        });
    const keywordsKey = keys[pathname]?.keywords;

    document.title = title;

    if (descriptionTag) {
      descriptionTag.content = description;
    }

    if (keywordsTag && keywordsKey) {
      keywordsTag.content = t(keywordsKey);
    }

    if (ogTitle) {
      ogTitle.content = title;
    }

    if (ogDescription) {
      ogDescription.content = description;
    }

    if (twitterTitle) {
      twitterTitle.content = title;
    }

    if (twitterDescription) {
      twitterDescription.content = description;
    }

    return () => {};
  }, [chainsRoutes, currentThemeColor, beacons, pathname, t, keys]);
};
