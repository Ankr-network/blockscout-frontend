import { BackButton, IBackButtonProps } from '../components/BackButton';

export const renderBackButton = ({ onClick }: IBackButtonProps) => (
  <BackButton onClick={onClick} />
);
