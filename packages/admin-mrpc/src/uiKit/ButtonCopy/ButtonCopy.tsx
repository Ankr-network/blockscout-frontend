import { Button, ButtonProps } from '@mui/material';
import { toast } from 'react-toastify';
import { copyToClipboard } from 'modules/common/utils/copyToClipboard';
import { ReactComponent as IconCopy } from 'assets/img/copy.svg';
import { useButtonCopyStyles } from './ButtonCopyStyles';

interface IButtonCopyProps extends ButtonProps {
  valueToCopy: string;
  className?: string;
  label?: string;
}
export const ButtonCopy = ({
  valueToCopy,
  className,
  label,
  ...props
}: IButtonCopyProps) => {
  const handleCopy = () => {
    copyToClipboard(valueToCopy)
      .then(() => toast.success(`copied successfully`))
      .catch(e => toast.error(e));
  };

  const { classes, cx } = useButtonCopyStyles();

  return (
    <Button
      className={cx(classes.root, className)}
      variant="text"
      onClick={handleCopy}
      {...props}
    >
      {label}
      <IconCopy />
    </Button>
  );
};
