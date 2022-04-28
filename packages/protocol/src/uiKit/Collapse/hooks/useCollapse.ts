import { useCallback, useState } from 'react';

export const useCollapse = (
  isCollapsed_: boolean,
  isCollapsible: boolean,
  onCollapse: (isCollapsed: boolean) => void,
): [boolean, () => void] => {
  const [isCollapsed, setCollapseMarker] = useState(isCollapsed_);

  const onHeaderClick = useCallback(() => {
    if (isCollapsible) {
      setCollapseMarker(!isCollapsed);

      onCollapse(!isCollapsed);
    }
  }, [isCollapsed, isCollapsible, onCollapse]);

  return [isCollapsed, onHeaderClick];
};
