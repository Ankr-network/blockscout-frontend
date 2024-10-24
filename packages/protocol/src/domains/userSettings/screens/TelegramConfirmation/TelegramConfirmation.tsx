import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { OverlaySpinner } from '@ankr.com/ui';
import { push } from 'connected-react-router';

import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { useConfirmTelegramIntegrationMutation } from 'domains/userSettings/actions/notifications/confirmTelegramIntegration';
import { useTelegramParams } from 'domains/userSettings/hooks/useTelegramParams';

export const TelegramConfirmation = () => {
  const dispatch = useDispatch();
  const { confirmationData } = useTelegramParams();

  const [confirmTelegramIntegration] = useConfirmTelegramIntegrationMutation();

  const handleConfirmTelegramIntegration = useCallback(
    async (confirmationDataValue: string) => {
      await confirmTelegramIntegration({
        confirmation_data: confirmationDataValue,
      });

      dispatch(push(UserSettingsRoutesConfig.settings.generatePath()));
    },
    [confirmTelegramIntegration, dispatch],
  );

  useEffect(() => {
    if (confirmationData) {
      handleConfirmTelegramIntegration(confirmationData);
    }
  }, [confirmationData, handleConfirmTelegramIntegration]);

  return <OverlaySpinner />;
};
