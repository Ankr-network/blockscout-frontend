import { userSettingDisableTwoFA } from 'domains/userSettings/actions/twoFA/disableTwoFA';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export const useDisableTwoFA = () => {
  const [handleDisable, { isLoading }] = useQueryEndpoint(
    userSettingDisableTwoFA,
  );

  return {
    handleDisable,
    isLoading,
  };
};
