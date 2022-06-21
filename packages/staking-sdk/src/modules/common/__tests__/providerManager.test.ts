import { ProviderManagerSingleton } from '..';

describe('modules/common/providerManager', () => {
  test('should return provider manager instance', () => {
    const instance = ProviderManagerSingleton.getInstance();

    expect(instance).toBeDefined();
    expect(instance).toStrictEqual(ProviderManagerSingleton.getInstance());
  });
});
