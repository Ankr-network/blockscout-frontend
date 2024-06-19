import { useCallback, useEffect, useState } from 'react';

import { useAppSelector } from 'store/useAppSelector';
import {
  selectGroupDetailsRequestArgs,
  selectIsGroupDetailsLoading,
} from 'domains/userGroup/store';

export interface IUseTeamItemAsyncAccordionParams {
  isExpanded?: boolean;
  isExpanding?: boolean;
  groupDetailsError?: unknown;
  onExpand: () => Promise<void>;
  groupAddress: string;
}

export const useTeamItemAsyncAccordion = ({
  groupAddress,
  groupDetailsError,
  isExpanded: isInitiallyExpanded = false,
  isExpanding: isInitiallyExpanding = false,
  onExpand,
}: IUseTeamItemAsyncAccordionParams) => {
  const [isExpanded, setIsExpanded] = useState(isInitiallyExpanded);
  const [isExpanding, setIsExpanding] = useState(isInitiallyExpanding);

  const isGroupDetailsLoading = useAppSelector(selectIsGroupDetailsLoading);
  const groupDetailsRequestArgs = useAppSelector(selectGroupDetailsRequestArgs);
  const currentRequestGroupAddress = groupDetailsRequestArgs?.group;
  const isCurrentGroupDetailsRequest =
    currentRequestGroupAddress === groupAddress;
  const canExpandItem =
    isCurrentGroupDetailsRequest &&
    !isGroupDetailsLoading &&
    !groupDetailsError;

  useEffect(() => {
    if (isGroupDetailsLoading) {
      setIsExpanded(false);
    }

    if (canExpandItem) {
      setIsExpanded(true);
    }
  }, [isGroupDetailsLoading, canExpandItem]);

  useEffect(() => {
    if (isCurrentGroupDetailsRequest && isGroupDetailsLoading) {
      setIsExpanding(true);
    } else {
      setIsExpanding(false);
    }
  }, [isCurrentGroupDetailsRequest, isGroupDetailsLoading]);

  const handleExpand = useCallback(async () => {
    if (isExpanded) {
      setIsExpanded(false);
    }

    if (!isExpanded) {
      await onExpand();
    }
  }, [isExpanded, onExpand]);

  const handleClose = useCallback(() => setIsExpanded(false), []);

  return { handleClose, handleExpand, isExpanded, isExpanding, setIsExpanded };
};
