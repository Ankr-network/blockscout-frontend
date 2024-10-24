export const OPEN_NOTIFICATION_DIALOG = 'openNotificationDialogUtils';

export const getOpenNotificationDialogId = () => {
  return localStorage.getItem(OPEN_NOTIFICATION_DIALOG);
};

export const setOpenNotificationDialogId = (id: string) => {
  localStorage.setItem(OPEN_NOTIFICATION_DIALOG, id);
};

export const removeOpenNotificationDialogId = () => {
  localStorage.removeItem(OPEN_NOTIFICATION_DIALOG);
};
