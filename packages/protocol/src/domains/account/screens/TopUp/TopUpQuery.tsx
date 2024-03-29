import { Loader } from 'domains/account/components/Loader';

import { TopUp } from './TopUp';
import { useTopupInitialStep } from './useTopupInitialStep';

export const TopUpQuery = () => {
  const { initialStep, hasPrivateAccess, isLoading } = useTopupInitialStep();

  if (isLoading || initialStep === null) {
    return <Loader />;
  }

  return (
    <TopUp initialStep={initialStep} hasPrivateAccess={hasPrivateAccess} />
  );
};
