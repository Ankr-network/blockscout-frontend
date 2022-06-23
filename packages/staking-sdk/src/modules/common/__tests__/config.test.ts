import { configFromEnv } from '../config';
import { Env } from '../env';

describe('modules/common/config', () => {
  test('should return configs by envs', () => {
    expect(configFromEnv(Env.Develop)).toBeDefined();
    expect(configFromEnv(Env.Production)).toBeDefined();
    expect(configFromEnv(Env.Stage)).toBeDefined();
    expect(configFromEnv('' as Env)).toBeDefined();
    expect(configFromEnv()).toBeDefined();
  });
});
