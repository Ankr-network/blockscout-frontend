

import { IManagedPromise } from './interfaces';
import { Transition, TransitionHandler } from './types';

interface Handler<State, Result, Action> {
  handler: TransitionHandler<State, Result>;
  action: Action;
}

interface ResultWrapper<Result> {
  resolved: boolean;
  result?: Result;
}

export class ManagedPromise<State, Result, Action>
  implements IManagedPromise<Result, Action>
{
  private handlers: Handler<State, Result, Action>[] = [];

  private result: ResultWrapper<Result> = {
    resolved: false,
  };

  public constructor(private state: State) {}

  public newAction(
    action: Action,
    handler: TransitionHandler<State, Result>,
  ): ManagedPromise<State, Result, Action> {
    this.handlers.push({ handler, action });

    return this;
  }

  public currentStep(): Action | false {
    if (!this.handlers.length) return false;

    const [{ action }] = this.handlers;

    return action;
  }

  public async nextUntil(step: Action): Promise<boolean> {
    if (!this.handlers.length) return false;
  
    while (this.handlers.length > 0) {
      const nextHandler = this.handlers[0];

      if (nextHandler.action === step) return true;

      // eslint-disable-next-line no-await-in-loop
      await this.execNextTransition();
    }

    return false;
  }

  private async execNextTransition(): Promise<Transition<Action, Result>> {
    if (!this.handlers.length) {
      return { resolved: false };
    }

    const [{ handler, action }] = this.handlers.splice(0, 1);
  
    this.state = await handler(
      this.state,
      (newResult: Result): State => {
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

  public async toPromise(): Promise<Result> {
    while (this.handlers.length > 0) {
      // eslint-disable-next-line no-await-in-loop
      await this.execNextTransition();
    }

    if (!this.result.resolved) {
      throw new Error(`can't resolve stepper result`);
    }

    return this.result.result!;
  }

  public getResult(): Result {
    return this.result.result!;
  }
}
