import { useEffect, useState } from 'react';
import { SelectInputProps } from '@mui/material/Select/SelectInput';
import { InputBaseProps } from '@mui/material';

type SelectProps = Partial<SelectInputProps<any>> & InputBaseProps;

export const useSelectorVisibility = () => {
  const [isOpen, setIsOpen] = useState(false);

  /* this useEffect is necessary for handling the select visibility on page scrolling */
  /* https://github.com/mui/material-ui/issues/17353#issuecomment-1002113498 */
  useEffect(() => {
    const handler = () => {
      setIsOpen(false);
    };

    window.addEventListener('scroll', handler);

    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, []);

  const selectProps: SelectProps = {
    open: isOpen,
    onOpen: () => {
      setIsOpen(true);
    },
    onClose: () => {
      setIsOpen(false);
    },
    size: 'small',
  };

  return selectProps;
};
