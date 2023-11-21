import { ReactNode } from 'react';

import { ProjectChainTab } from 'domains/projects/screens/Project/components/ProjectChainTab';

interface ScrollButtonProps {
  onClick: () => void;
  className?: string;
  name: ReactNode;
  isButtonVisible: boolean;
}

export const ScrollButton = ({
  onClick,
  className,
  name,
  isButtonVisible,
}: ScrollButtonProps) => {
  if (!isButtonVisible) {
    return null;
  }

  return (
    <ProjectChainTab onClick={onClick} className={className} name={name} />
  );
};
