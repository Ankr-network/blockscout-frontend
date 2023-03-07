import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import {
  selectForms,
  setFormState as setFormStateAction,
} from '../store/formsSlice';

interface IUseFormState<TFormState> {
  formState?: TFormState;
  /**
   * Redux action
   */
  setFormState: (state: TFormState) => void;
}

export const useFormState = <TFormState>(
  formId: string,
): IUseFormState<TFormState> => {
  const formState = useSelector(selectForms)[formId] as TFormState | undefined;

  const setFormState = useCallback(
    (state: TFormState) =>
      setFormStateAction({
        formId,
        state,
      }),
    [formId],
  );

  return { formState, setFormState };
};
