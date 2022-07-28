export enum DialogTitleColor {
  Regular = 'REGULAR',
  ERROR = 'ERROR',
}

export type DialogTitle = {
  title: string;
  color?: DialogTitleColor;
};

export interface IDialogContext {
  dialogTitle: DialogTitle;
  setDialogTitle: (title: DialogTitle) => void;
  closeDialog: () => void;
}
