import { ChangeEvent, useCallback } from 'react';

import { t } from 'common';

import { setLocale } from 'modules/i18n/store/i18nSlice';
import { useAppDispatch } from 'store/useAppDispatch';
import { Select } from 'uiKit/Select';

import { useLocale } from '../../../i18n/hooks/useLocale';
import { useLocaleMemo } from '../../../i18n/hooks/useLocaleMemo';
import { Locale } from '../../../i18n/types/locale';

export interface ILocaleSwitcher {
  className?: string;
}

export const LocaleSwitcher = ({
  className = '',
}: ILocaleSwitcher): JSX.Element => {
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
      fullWidth={false}
      options={localeOptions}
      value={locale}
      onChange={onChange}
    />
  );
};
