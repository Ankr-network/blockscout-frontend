import { Box } from '@material-ui/core';
import { useState } from 'react';

import { CalcSlider } from 'modules/dashboard/components/CalcSlider';
import { EmptyState } from 'modules/dashboard/components/EmptyState';
import { Container } from 'uiKit/Container';

/**
 * Remove after https://ankrnetwork.atlassian.net/browse/STAKAN-1810
 */
export const DevPage = (): JSX.Element => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: unknown, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <Box py={6}>
      <Container>
        <EmptyState
          calcSlot={
            <>
              {value}

              <Box px={4} py={2}>
                <CalcSlider
                  defaultValue={100}
                  max={365}
                  onChange={handleChange}
                />
              </Box>
            </>
          }
        />
      </Container>
    </Box>
  );
};
