import React, { useState } from 'react';

import { GlobalMenu } from '.';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link } from 'react-router-dom';

export default {
  title: 'GlobalMenu',
};

enum Locale {
  en = 'en-US',
}

export const Default = (): JSX.Element => {
  const [locale] = useState<string>(Locale.en);

  return <GlobalMenu project="rpc" Link={Link} locale={locale} />;
};

export const Mobile = (): JSX.Element => (
  <GlobalMenu project="rpc" Link={Link} isMobile locale={Locale.en} />
);
