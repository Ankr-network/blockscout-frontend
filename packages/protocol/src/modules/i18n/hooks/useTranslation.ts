import { useLayoutEffect, useMemo, useState } from 'react';
import intl from 'react-intl-universal';
import { uid } from 'react-uid';
import { t, tHTML } from '@ankr.com/common';

import { Locale } from '../types/locale';

const DEFAULT_LOCALE = Locale.en;

type TNestedObject = Record<string, string | Record<string, string>>;

function transformToUniqueFlatKey(
  id: string,
  key: string,
  value: string | Record<string, string>,
): string | Record<string, string> {
  if (typeof value === 'string') {
    return `${id}.${key}`;
  }

  return Object.keys(value).reduce((obj, itemKey) => {
    obj[itemKey] = `${id}.${key}.${itemKey}`;

    return obj;
  }, {} as Record<string, string>);
}

type TTranslation<T> = { [Locale.en]: T } & {
  [key in Locale]?: T;
};

export type Translation<T extends TNestedObject> = TTranslation<T>;

export type UseTranslationResult<T extends TNestedObject> = {
  t: typeof t;
  tHTML: typeof tHTML;
  keys: T;
  locale: Locale;
};

export function useTranslation<T extends TNestedObject>(
  data: Translation<T>,
): UseTranslationResult<T> {
  const [id] = useState(uid(data));
  const [isLoaded, setIsLoaded] = useState(false);

  const keys = useMemo(() => {
    return Object.entries(data[DEFAULT_LOCALE]).reduce((obj, [key, value]) => {
      (obj as TNestedObject)[key] = transformToUniqueFlatKey(id, key, value);

      return obj;
    }, {} as T);
  }, [data, id]);

  useLayoutEffect(() => {
    if (isLoaded && intl.get(id)) {
      return;
    }

    const intlData = Object.entries(data).reduce(
      (localeData, [locale, translations]) => {
        localeData[locale as Locale] = {
          [id]: translations,
        } as TNestedObject;

        return localeData;
      },
      {} as TTranslation<TNestedObject>,
    );

    intl.load(intlData);
    setIsLoaded(true);
  }, [data, id, isLoaded]);

  return {
    t,
    tHTML,
    keys,
    locale: DEFAULT_LOCALE,
  };
}
