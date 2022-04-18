export interface IManagedPromise<Result, Action> {
  nextUntil(step: Action): Promise<boolean>;

  currentStep(): Action | false;

  next(): Promise<boolean>;

  toPromise(): Promise<Result>;

  getResult(): Result;
}