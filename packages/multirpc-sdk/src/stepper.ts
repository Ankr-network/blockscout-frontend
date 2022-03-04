export interface IManagedPromise<ResultType, ActionType> {
  nextUntil(step: ActionType): Promise<boolean>;

  currentStep(): ActionType | false;

  next(): Promise<boolean>;

  toPromise(): Promise<ResultType>;

  getResult(): ResultType;
}

export type StateTransitionFunction<StateType, ResultType> = (
  state: StateType,
  resolve: (result: ResultType) => StateType,
) => PromiseLike<StateType>;

export class ManagedPromise<StateType, ResultType, ActionType>
  implements IManagedPromise<ResultType, ActionType>
{
  private handlers: {
    handler: StateTransitionFunction<StateType, ResultType>;
    action: ActionType;
  }[] = [];

  private result: {
    resolved: boolean;
    result?: ResultType;
  } = {
    resolved: false,
  };

  public constructor(private state: StateType) {}

  public newAction(
    action: ActionType,
    handler: StateTransitionFunction<StateType, ResultType>,
  ): ManagedPromise<StateType, ResultType, ActionType> {
    this.handlers.push({ handler, action });
    return this;
  }

  public currentStep(): ActionType | false {
    if (!this.handlers.length) return false;
    const [{ action }] = this.handlers;
    return action;
  }

  public async nextUntil(step: ActionType): Promise<boolean> {
    if (!this.handlers.length) return false;
    while (this.handlers.length > 0) {
      const nextHandler = this.handlers[0];
      if (nextHandler.action === step) return true;
      // eslint-disable-next-line no-await-in-loop
      await this.execNextTransition();
    }
    return false;
  }

  private async execNextTransition(): Promise<{
    action?: ActionType;
    result?: ResultType;
    resolved: boolean;
  }> {
    if (!this.handlers.length) {
      return { resolved: false };
    }
    const [{ handler, action }] = this.handlers.splice(0, 1);
    this.state = await handler(
      this.state,
      (newResult: ResultType): StateType => {
        this.result = {
          result: newResult,
          resolved: true,
        };
        return this.state;
      },
    );
    if (this.result.resolved) {
      this.handlers = [];
      return this.result;
    }
    return { action, resolved: false };
  }

  public async next(): Promise<boolean> {
    const { resolved } = await this.execNextTransition();
    return !resolved;
  }

  public async toPromise(): Promise<ResultType> {
    while (this.handlers.length > 0) {
      // eslint-disable-next-line no-await-in-loop
      await this.execNextTransition();
    }
    if (!this.result.resolved) {
      throw new Error(`can't resolve stepper result`);
    }
    return this.result.result!;
  }

  public getResult(): ResultType {
    return this.result.result!;
  }
}
