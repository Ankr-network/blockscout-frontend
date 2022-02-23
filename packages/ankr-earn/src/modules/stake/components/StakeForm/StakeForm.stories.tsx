import { StakeForm } from './StakeForm';

const StakeFormStory = () => {
  return (
    <StakeForm loading={false} stakingAmountStep={0.5} onSubmit={() => null} />
  );
};

export const StakeFormExample = (): JSX.Element => <StakeFormStory />;

export default {
  title: 'modules/StakeForm',
};
