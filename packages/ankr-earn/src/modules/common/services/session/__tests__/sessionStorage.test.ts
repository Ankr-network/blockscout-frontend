import { SessionService } from '..';

describe('modules/common/services/session/sessionService', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should set session item properly', () => {
    const spySetItem = jest.spyOn(window.sessionStorage, 'setItem');

    const sessionServiceInstance = new SessionService();
    sessionServiceInstance.setItem('key', 'value');

    expect(spySetItem).toBeCalledTimes(1);
    expect(spySetItem).toBeCalledWith('key', '"value"');
  });

  test('should get session item properly', () => {
    const spyGetItem = jest.spyOn(window.sessionStorage, 'getItem');

    const sessionServiceInstance = new SessionService();
    sessionServiceInstance.getItem('key');

    expect(spyGetItem).toBeCalledTimes(1);
    expect(spyGetItem).toBeCalledWith('key');
  });

  test('should return null if there is no session item', () => {
    const spyGetItem = jest
      .spyOn(window.sessionStorage, 'getItem')
      .mockImplementation(() => '');

    const sessionServiceInstance = new SessionService();
    const result = sessionServiceInstance.getItem('key');

    expect(result).toBeNull();
    expect(spyGetItem).toBeCalledTimes(1);
    expect(spyGetItem).toBeCalledWith('key');
  });

  test('should catch json parse error and get null item', () => {
    const spyGetItem = jest
      .spyOn(window.sessionStorage, 'getItem')
      .mockImplementation(() => 'wrong');

    const sessionServiceInstance = new SessionService();
    const result = sessionServiceInstance.getItem('key');

    expect(result).toBeNull();
    expect(spyGetItem).toBeCalledTimes(1);
    expect(spyGetItem).toBeCalledWith('key');
  });

  test('should remove session item properly', () => {
    const spyRemoveItem = jest.spyOn(window.sessionStorage, 'removeItem');

    const sessionServiceInstance = new SessionService();
    sessionServiceInstance.removeItem('key');

    expect(spyRemoveItem).toBeCalledTimes(1);
    expect(spyRemoveItem).toBeCalledWith('key');
  });
});
