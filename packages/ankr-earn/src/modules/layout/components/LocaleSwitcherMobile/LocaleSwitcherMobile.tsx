import { FC, useCallback } from 'react';
import { Locale } from '../../../i18n/types/locale';
import { t } from '../../../i18n/utils/intl';
import { setLocale } from '../../../i18n/i18nSlice';
import { useLocaleMemo } from '../../../i18n/hooks/useLocaleMemo';
import { useLocale } from '../../../i18n/hooks/useLocale';
import { useAppDispatch } from 'store/useAppDispatch';
import { Button } from '@material-ui/core';
import { useStyles } from './useLocaleSwitcherMobileStyles';
import classNames from 'classnames';

export interface ILocaleSwitcherMobile {
  className?: string;
}

export const LocaleSwitcherMobile: FC<ILocaleSwitcherMobile> = ({
  className = '',
}) => {
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
      variant="text"
      onClick={() => onClick(option.value)}
      className={classNames(
        classes.button,
        option.value === locale ? classes.activeButton : '',
      )}
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
