import { createContext, useContext } from 'react';
import { DialogTitleColor, IDialogContext } from './types';

const contextFallback: IDialogContext = {
  dialogTitle: {
    title: '',
    color: DialogTitleColor.Regular,
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDialogTitle() {
    // eslint-disable-next-line no-console
    console.warn(`Make sure you provided DilogTitleContext via Provider`);
  },
  closeDialog() {
    // eslint-disable-next-line no-console
    console.warn(`Make sure you passed 'onClose' prop to the Dialog`);
  },
};

export const DialogContext = createContext<IDialogContext>(contextFallback);

export const useDialogContext = () => useContext(DialogContext);
