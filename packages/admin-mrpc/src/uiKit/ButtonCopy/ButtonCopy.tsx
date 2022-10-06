import { ReactComponent as IconCopy } from 'assets/img/copy.svg';
import { Button } from '@mui/material';
import { copyToClipboard } from '../../modules/common/utils/copyToClipboard';
import { toast } from 'react-toastify';

interface IButtonCopyProps {
  valueToCopy: string;
  label?: string;
}
export const ButtonCopy = ({ valueToCopy, label }: IButtonCopyProps) => {
  const handleCopy = () => {
    copyToClipboard(valueToCopy)
      .then(() => toast.success(`copied successfully`))
      .catch(e => toast.error(e));
  };

  return (
    <Button variant="text" onClick={handleCopy}>
      {label}
      <IconCopy />
    </Button>
  );
};
