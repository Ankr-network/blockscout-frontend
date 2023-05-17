import { userSettingsConfirmTwoFA } from 'domains/userSettings/actions/twoFA/confirmTwoFA';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export const useConfirmTwoFA = () => {
  const [handleConfirm, { isLoading }] = useQueryEndpoint(
    userSettingsConfirmTwoFA,
  );

  return {
    handleConfirm,
    isLoading,
  };
};
