import { useLayoutEffect } from 'react';
import { useDialogContext } from './DialogContext';
import { DialogTitleColor } from './types';

export const useDialogTitle = (
  title: string,
  color: DialogTitleColor = DialogTitleColor.Regular,
) => {
  const { setDialogTitle } = useDialogContext();

  useLayoutEffect(() => {
    setDialogTitle({ title, color });
  }, [color, setDialogTitle, title]);
};
