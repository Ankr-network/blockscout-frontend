import React from 'react';
import { StakeForm } from './StakeForm';

const StakeFormStory = () => {
  return (
    <StakeForm
      onSubmit={() => null}
      onCancel={() => null}
      stakingAmountStep={0.5}
      loading={false}
    />
  );
};

export const StakeFormExample = () => <StakeFormStory />;

export default {
  title: 'modules/StakeForm',
};
