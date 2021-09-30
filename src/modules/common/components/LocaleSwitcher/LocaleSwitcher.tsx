import React, { ChangeEvent, useCallback } from 'react';
import { Locale } from 'modules/i18n/types/locale';
import { setLocale } from 'modules/i18n/i18nSlice';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { useLocale } from 'modules/i18n/utils/useLocale';
import { Select } from 'uiKit/Select';
import { t } from 'modules/i18n/utils/intl';
import { useAppDispatch } from 'store/useAppDispatch';

import { useLocaleSwitcher } from './LocaleSwitcherStyles';

export const LocaleSwitcher = () => {
  const classes = useLocaleSwitcher();
  const dispatch = useAppDispatch();

  const localeOptions = useLocaleMemo(
    () => [
      {
        value: Locale.en,
        label: t('language.en-US'),
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
      className={classes.root}
      value={locale}
      onChange={onChange}
      options={localeOptions}
      fullWidth={false}
    />
  );
};
