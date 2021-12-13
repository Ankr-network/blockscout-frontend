import React from 'react';

const useInitEffect = (effect: React.EffectCallback) => {
  // eslint-disable-next-line
  return React.useEffect(effect, []);
};

export { useInitEffect };
