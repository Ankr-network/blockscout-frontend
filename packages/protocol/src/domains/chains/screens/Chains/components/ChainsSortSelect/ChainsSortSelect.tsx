import React, { ChangeEvent, useCallback } from 'react';

import { Locale } from 'modules/i18n/types/locale';
import { setLocale } from 'modules/i18n/i18nSlice';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { Select } from 'uiKit/Select';
import { useAppDispatch } from 'store/useAppDispatch';
import { useStyles } from './ChainsSortSelectStyles';

export const ChainsSortSelect = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const options = useLocaleMemo(
    () => [
      {
        value: 'relevance',
        label: 'Sort by relevance',
      },
    ],
    [],
  );

  const onChange = useCallback(
    (event: ChangeEvent<{ value: unknown }>) => {
      dispatch(setLocale(event.target.value as Locale));
    },
    [dispatch],
  );

  return (
    <Select
      className={classes.root}
      value="relevance"
      onChange={onChange}
      options={options}
      fullWidth={false}
    />
  );
};
