import React from 'react';
import { StakeForm } from './StakeForm';

const StakeFormStory = () => {
  return (
    <StakeForm stakingAmountStep={0.5} loading={false} onSubmit={() => null} />
  );
};

export const StakeFormExample = () => <StakeFormStory />;

export default {
  title: 'modules/StakeForm',
};
