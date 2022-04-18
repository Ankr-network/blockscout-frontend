export type Resolver<State, Result> = (result: Result) => State;

export interface Transition<Action, Result> {
  action?: Action;
  result?: Result;
  resolved: boolean;
}

export type TransitionHandler<State, Result> =
  (state: State, resolve: Resolver<State, Result>) => PromiseLike<State>;