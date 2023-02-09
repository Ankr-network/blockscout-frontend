import intl from 'react-intl-universal';

import { locales } from '../locales';
import { Locale } from '../types/locale';

export const initializeLocale = async () => {
  intl.init({
    currentLocale: Locale.en,
    fallbackLocale: Locale.en,
    locales,
  });
};
