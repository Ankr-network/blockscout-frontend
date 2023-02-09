import React, { useCallback } from 'react';

import { Locale } from 'modules/i18n/types/locale';
import { setLocale } from 'modules/i18n/i18nSlice';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { useLocale } from 'modules/i18n/utils/useLocale';
import { Select } from 'uiKit/Select';
import { t } from '@ankr.com/common';
import { useAppDispatch } from 'store/useAppDispatch';
import { SelectChangeEvent } from '@mui/material';

interface LocaleSwitcherProps {
  className?: string;
}

export const LocaleSwitcher = ({ className }: LocaleSwitcherProps) => {
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
    (event: SelectChangeEvent<unknown>) => {
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
      disabled
    />
  );
};