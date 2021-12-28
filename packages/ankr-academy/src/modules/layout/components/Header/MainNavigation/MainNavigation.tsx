import React from 'react';
import { t } from 'modules/i18n/utils/intl';
import { Navigation } from 'modules/common/components/Navigation';
import { AcademyRoutesConfig } from '../../../../../domains/academy/Routes';
import { LibraryRoutesConfig } from '../../../../../domains/library/Routes';

export const MainNavigation = () => {
  const items = [
    {
      label: t('main-navigation.academy'),
      href: AcademyRoutesConfig.academy.generatePath(),
    },
    {
      label: t('main-navigation.library'),
      href: LibraryRoutesConfig.library.generatePath(),
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
