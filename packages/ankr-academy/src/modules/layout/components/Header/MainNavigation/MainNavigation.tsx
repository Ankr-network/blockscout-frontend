import React from 'react';
import { t } from 'modules/i18n/utils/intl';
import { Navigation } from '../../../../common/components/Navigation';

export const MainNavigation = () => {
  const items = [
    {
      label: t('main-navigation.academy'),
      href: '/academy', // TODO: add proper route
    },
    {
      label: t('main-navigation.library'),
      href: '/library', // TODO: add proper route
    },
    {
      label: t('main-navigation.glossary'),
      href: '/glossary', // TODO: add proper route
    },
  ];

  return (
    <>
      <Navigation items={items} />
    </>
  );
};
