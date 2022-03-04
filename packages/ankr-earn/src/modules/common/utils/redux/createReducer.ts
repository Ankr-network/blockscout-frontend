type Reducer<S, A> = (state: S, action: A) => S;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createReducer = <S, A extends { type: string; payload: any }>(
  initialState: S,
  handlers: Record<string, Reducer<S, A>>,
): Reducer<S, A> => {
  return (state: S = initialState, action: A): S => {
    return handlers[action.type] ? handlers[action.type](state, action) : state;
  };
};
