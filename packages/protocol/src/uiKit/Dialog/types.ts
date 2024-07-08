import { ReactNode } from 'react';

export enum DialogTitleColor {
  Regular = 'REGULAR',
  ERROR = 'ERROR',
}

export type DialogTitle = {
  title?: ReactNode;
  color?: DialogTitleColor;
};
