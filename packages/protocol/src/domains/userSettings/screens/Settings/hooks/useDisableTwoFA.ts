import { userSettingDisableTwoFA } from 'domains/userSettings/actions/twoFA/disableTwoFA';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export const useDisableTwoFA = () => {
  const [handleDisable] = useQueryEndpoint(userSettingDisableTwoFA);

  return {
    handleDisable,
  };
};
