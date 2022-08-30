import { Box } from '@material-ui/core';
import { useState } from 'react';

import { YieldSlider } from '../YieldSlider';

const defaultValue = 100;

export const Yield = (): JSX.Element => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (_event: unknown, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <Box px={4} py={2}>
      {value}

      <YieldSlider
        defaultValue={defaultValue}
        max={365}
        onChange={handleChange}
      />
    </Box>
  );
};
