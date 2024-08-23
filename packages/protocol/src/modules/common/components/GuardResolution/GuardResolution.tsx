import { useMemo } from 'react';

import { useIsMDDown, useIsSMDown, useIsXSDown } from 'uiKit/Theme/useTheme';

interface GuardResolutionProps {
  children: React.ReactNode;
  protectedResolution: 'xsDown' | 'smDown' | 'mdDown';
}

export const GuardResolution = ({
  children,
  protectedResolution,
}: GuardResolutionProps) => {
  const isXsDown = useIsXSDown();
  const isSmDown = useIsSMDown();
  const isMdDown = useIsMDDown();

  const isHidden = useMemo(() => {
    switch (protectedResolution) {
      case 'xsDown':
        return isXsDown;
      case 'smDown':
        return isSmDown;
      case 'mdDown':
        return isMdDown;
      default:
        return false;
    }
  }, [isXsDown, isSmDown, isMdDown, protectedResolution]);

  return isHidden ? null : <>{children}</>;
};
