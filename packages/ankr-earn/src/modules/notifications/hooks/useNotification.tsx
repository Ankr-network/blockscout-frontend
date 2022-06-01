import {
  OptionsObject,
  SnackbarKey,
  SnackbarMessage,
  useSnackbar,
} from 'notistack';
import { useCallback } from 'react';

import { NotificationClose } from '../components/NotificationClose';

export interface INotificationOptions extends Omit<OptionsObject, 'action'> {
  withCloseButton?: boolean;
  message: SnackbarMessage;
}

interface IUseNotification {
  showNotification: (options: INotificationOptions) => SnackbarKey;
  closeNotification: (key?: SnackbarKey) => void;
}

/**
 * It is a wrapper for [useSnackbar](https://iamhosseindhv.com/notistack) hook
 * dedicated to add default close button for all notifications.
 */
export const useNotification = (): IUseNotification => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const renderCloseButton = useCallback(
    (key: SnackbarKey) => {
      const handleClick = () => closeSnackbar(key);
      return <NotificationClose onClick={handleClick} />;
    },
    [closeSnackbar],
  );

  const showNotification = useCallback(
    ({
      message,
      withCloseButton = true,
      ...restOptions
    }: INotificationOptions) => {
      return enqueueSnackbar(message, {
        ...restOptions,
        action: withCloseButton ? renderCloseButton : undefined,
      });
    },
    [renderCloseButton, enqueueSnackbar],
  );

  return {
    showNotification,
    closeNotification: closeSnackbar,
  };
};
