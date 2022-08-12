import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

type TFormId = string;
// todo: add typings
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TFormState = Record<string, any>;

interface ISetFormStatePayload {
  formId: TFormId;
  state: TFormState;
}

export type IFormsState = Record<TFormId, TFormState>;

const initialState: IFormsState = {};

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setFormState: (state, action: PayloadAction<ISetFormStatePayload>) => {
      state[action.payload.formId] = action.payload.state;
    },
    resetAll: () => initialState,
    resetForm: (state, action: PayloadAction<TFormId>) => {
      delete state[action.payload];
    },
  },
});

const selectFormsState = (state: RootState) => state.forms;
export const selectForms = createSelector(selectFormsState, state => state);

export const {
  reducer: formsReducer,
  actions: { setFormState, resetAll, resetForm },
} = formsSlice;
