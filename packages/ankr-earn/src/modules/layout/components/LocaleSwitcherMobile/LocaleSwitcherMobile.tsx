import { Button } from '@material-ui/core';
import classNames from 'classnames';
import { useCallback } from 'react';

import { useAppDispatch } from 'store/useAppDispatch';

import { useLocale } from '../../../i18n/hooks/useLocale';
import { useLocaleMemo } from '../../../i18n/hooks/useLocaleMemo';
import { setLocale } from '../../../i18n/i18nSlice';
import { Locale } from '../../../i18n/types/locale';
import { t } from '../../../i18n/utils/intl';

import { useLocaleSwitcherMobileStyles as useStyles } from './useLocaleSwitcherMobileStyles';

export interface ILocaleSwitcherMobile {
  className?: string;
}

export const LocaleSwitcherMobile = ({
  className = '',
}: ILocaleSwitcherMobile): JSX.Element => {
  const classes = useStyles();
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

  const onClick = useCallback(
    (value: Locale) => {
      dispatch(setLocale(value));
    },
    [dispatch],
  );

  const renderedOptions = localeOptions.map(option => (
    <Button
      key={option.label}
      className={classNames(
        classes.button,
        option.value === locale && classes.activeButton,
      )}
      variant="text"
      onClick={() => onClick(option.value)}
    >
      {option.label}
    </Button>
  ));

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.language}>{t('language.language')}</div>

      <div className={classes.buttonsWrapper}>{renderedOptions}</div>
    </div>
  );
};
