import { ReactNode } from 'react';

export interface PlaceholderProps {
  children: ReactNode;
  hasPlaceholder: boolean;
  placeholder: ReactNode;
}

export const Placeholder = ({
  children,
  hasPlaceholder,
  placeholder,
}: PlaceholderProps) => {
  if (hasPlaceholder) {
    return <>{placeholder}</>;
  }

  return <>{children}</>;
};
