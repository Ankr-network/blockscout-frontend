import { useCallback, useEffect, useState } from 'react';

import { isCodeExpandable } from '../utils/isCodeExpandable';

export type Expander = [boolean, () => void];

export const useExpander = (code: string): Expander => {
  const [isExpanded, setExpandedMarker] = useState(!isCodeExpandable(code));

  const toggle = useCallback(() => {
    setExpandedMarker(wasExpanded => !wasExpanded);
  }, []);

  useEffect(() => {
    setExpandedMarker(!isCodeExpandable(code));
  }, [code]);

  return [isExpanded, toggle];
};
