import React from 'react';

import { PlusMinusBtn } from './PlusMinusBtn';

export default {
  title: 'modules/common/components/PlusMinusBtn',
};

export const Default = () => {
  return <PlusMinusBtn isLoading={false} tooltip="Stake" />;
};
