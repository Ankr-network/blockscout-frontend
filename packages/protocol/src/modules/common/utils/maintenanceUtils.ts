const MAINTENANCE_DIALOG_KEY = 'hasMaintenanceDialogBeenShown';

export const hasMaintenanceDialogBeenShown = () => {
  return Boolean(localStorage.getItem(MAINTENANCE_DIALOG_KEY));
};

export const setMaintenanceDialogAsShown = () => {
  localStorage.setItem(MAINTENANCE_DIALOG_KEY, 'true');
};
