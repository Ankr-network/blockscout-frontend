import { AnyAction } from 'redux';

type Reducer<State> = (State: any, Action: any) => State;

export const createReducer = (
  initialState: any,
  handlers: { [key: string]: Reducer<any> },
): Reducer<any> => {
  return (state: any = initialState, action: AnyAction): any => {
    return handlers.hasOwnProperty(action.type)
      ? handlers[action.type](state, action)
      : state;
  };
};
