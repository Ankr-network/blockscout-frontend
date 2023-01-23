import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useTopUpTrackingHandler } from 'domains/account/hooks/useTopUpTrackingHandler';

export const useTrackFailureTopUp = () => {
  const trackTopUp = useTopUpTrackingHandler();

  useOnMount(() => trackTopUp({ isTopUpSuccessful: false }));
};
