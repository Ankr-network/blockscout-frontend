import { isChildNull, TNodeWithType } from '../children';

describe('modules/common/utils/children', () => {
  test('should return false if child is null', () => {
    expect(isChildNull()).toBe(true);
    expect(isChildNull({ type: () => null } as TNodeWithType)).toBe(true);
  });

  test('should return true if child is not null', () => {
    expect(isChildNull({ type: () => '' } as TNodeWithType)).toBe(false);
    expect(isChildNull({ type: () => 'element' } as TNodeWithType)).toBe(false);
  });
});
