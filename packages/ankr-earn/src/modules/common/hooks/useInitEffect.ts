import React from 'react';

const useInitEffect = (effect: React.EffectCallback): void => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useEffect(effect, []);
};

export { useInitEffect };
