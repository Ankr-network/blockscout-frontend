import { Locale } from 'modules/i18n/types/locale';
import { useAppSelector } from 'store/useAppSelector';

export function useLocale(): { locale: Locale } {
  return useAppSelector(({ i18n: { locale } }) => {
    return { locale };
  });
}
