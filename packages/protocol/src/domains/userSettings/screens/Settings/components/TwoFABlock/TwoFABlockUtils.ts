import { useLazyUserSettingsFetchTwoFAStatusQuery } from 'domains/userSettings/actions/twoFA/fetchTwoFAStatus';
import { useOnMount } from 'modules/common/hooks/useOnMount';

export const useTwoFAStatusQuery = () => {
  const [fetchTwoFAStatus, fetchTwoFAStatusState] =
    useLazyUserSettingsFetchTwoFAStatusQuery();

  useOnMount(() => {
    fetchTwoFAStatus();
  });

  return fetchTwoFAStatusState;
};
