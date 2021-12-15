import { useMutation } from '@redux-requests/react';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NotificationActions } from '../../store/actions/NotificationActions';
import { getErrorMessage } from '../QueryError/QueryError';
import { resetRequests } from '@redux-requests/core';

interface IMutationErrorHandlerProps {
  type: string;
  filter?: (error: any) => boolean;
}

export const MutationErrorHandler = ({
  type,
  filter,
}: IMutationErrorHandlerProps) => {
  const { error } = useMutation({ type });
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      if (error) {
        dispatch(resetRequests([type], false));
      }
    },
    [dispatch, error, type],
  );

  useEffect(() => {
    if (error) {
      const message = getErrorMessage({ error });
      if (filter ? !filter(message) : true) {
        dispatch(
          NotificationActions.showNotification({
            message,
            severity: 'error',
          }),
        );
      }
    }
  }, [dispatch, error, filter]);

  return <></>;
};
