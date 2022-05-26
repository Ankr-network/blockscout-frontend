export interface DeleteEndpointDialogProps {
  id: string;
  isOpened: boolean;
  name: string;
  onClose: () => void;
  onSubmit: () => void;
}
