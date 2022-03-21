export interface ChainDialogProps {
  isOpened: boolean;
  onClose: () => void;
  onButtonClick: () => void;
  id: string;
  icon: string;
  name: string;
}
