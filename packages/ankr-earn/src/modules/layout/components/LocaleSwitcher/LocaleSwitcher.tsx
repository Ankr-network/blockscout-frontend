import { ChangeEvent, useCallback } from 'react';
import { Locale } from '../../../i18n/types/locale';
import { t } from '../../../i18n/utils/intl';
import { setLocale } from '../../../i18n/i18nSlice';
import { useLocaleMemo } from '../../../i18n/hooks/useLocaleMemo';
import { useLocale } from '../../../i18n/hooks/useLocale';
import { useAppDispatch } from 'store/useAppDispatch';
import { Select } from 'uiKit/Select';

export interface ILocaleSwitcher {
  className?: string;
}

export const LocaleSwitcher = ({ className = '' }: ILocaleSwitcher) => {
  const dispatch = useAppDispatch();
  const localeOptions = useLocaleMemo(
    () => [
      {
        value: Locale.en,
        label: t('language.en-US'),
      },
      {
        value: Locale.zh,
        label: t('language.zh-CN'),
      },
    ],
    [],
  );

  const { locale } = useLocale();

  const onChange = useCallback(
    (event: ChangeEvent<{ value: unknown }>) => {
      dispatch(setLocale(event.target.value as Locale));
    },
    [dispatch],
  );

  return (
    <Select
      className={className}
      value={locale}
      onChange={onChange}
      options={localeOptions}
      fullWidth={false}
    />
  );
};
