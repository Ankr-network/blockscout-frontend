import React from 'react';

import { PlusMinusBtn } from './PlusMinusBtn';

export default {
  title: 'components/PlusMinusBtn',
};

export const Default = () => {
  return <PlusMinusBtn isLoading={false} tooltip="Stake" />;
};
