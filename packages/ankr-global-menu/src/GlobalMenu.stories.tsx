import { Locale } from './i18n/types/locale';
import { GlobalMenu } from '.';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default {
  title: 'GlobalMenu',
};

export const Default = (): JSX.Element => {
  const [locale] = useState<string>(Locale.en);
  return <GlobalMenu project="protocol" Link={Link} locale={locale} />;
};
export const Mobile = (): JSX.Element => (
  <GlobalMenu project="protocol" Link={Link} isMobile locale={Locale.en} />
);
