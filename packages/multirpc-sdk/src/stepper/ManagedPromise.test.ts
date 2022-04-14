import { ManagedPromise } from './ManagedPromise';

type TestState = {
  fieldOne?: string;
  fieldTwo?: number;
};

describe('managed promise', () => {
  const state: TestState = {};
  let promise = new ManagedPromise<TestState, string, 'one' | 'two'>({});

  beforeEach(() => {
    promise = new ManagedPromise<TestState, string, 'one' | 'two'>({});

    promise.newAction(
      'one',
      async (ss: TestState): Promise<TestState> => {
        return { ...ss, fieldOne: 'Hello, World' };
      },
    );

    promise.newAction(
      'two',
      async (ss: TestState, resolve): Promise<TestState> => {
        const newSs = { ...ss, fieldTwo: 123 };
        resolve(`${newSs.fieldOne} -> ${newSs.fieldTwo}`);
        return newSs;
      },
    );
  });
  it('should work as promise', async () => {
    const result = await promise.toPromise();

    expect(result).toBe('Hello, World -> 123');
  });
  it('until next should work', async () => {
    // find one (we're on one)
    const r1 = await promise.nextUntil('one');

    expect(r1).toBeTruthy();
    expect(promise.currentStep()).toBe('one');

    // go to next step (two)
    expect(await promise.next()).toBeTruthy();
    expect(promise.currentStep()).toBe('two');

    // do until two (it should change anything, cuz we're on two)
    expect(await promise.nextUntil('two')).toBeTruthy();

    // get result
    expect(await promise.next()).toBeFalsy();
    expect(promise.currentStep()).toBeFalsy();
  
    // check result
    expect(promise.getResult()).toBe('Hello, World -> 123');
  });
});
