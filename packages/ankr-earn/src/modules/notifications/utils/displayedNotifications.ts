import { SnackbarKey } from 'notistack';

let displayed: SnackbarKey[] = [];

export const getDisplayed = (): SnackbarKey[] => displayed;

export const storeDisplayed = (id: SnackbarKey): void => {
  displayed = displayed.concat(id);
};

export const removeDisplayed = (id: SnackbarKey): void => {
  displayed = displayed.filter(key => id !== key);
};
