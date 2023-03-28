import { ReactNode } from 'react';

export enum DialogTitleColor {
  Regular = 'REGULAR',
  ERROR = 'ERROR',
}

export type DialogTitle = {
  title?: ReactNode;
  color?: DialogTitleColor;
};

export interface IDialogContext {
  dialogTitle: DialogTitle;
  setDialogTitle: (title: DialogTitle) => void;
  closeDialog?: () => void;
}
