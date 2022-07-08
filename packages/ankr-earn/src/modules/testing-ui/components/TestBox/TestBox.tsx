import { Box, Container, Paper } from '@material-ui/core';
import { ReactNode } from 'react';

import { RoutesConfig } from 'modules/testing-ui/Routes';
import { CloseButton } from 'uiKit/CloseButton';

interface ITestBoxProps {
  children: ReactNode;
}

export const TestBox = ({ children }: ITestBoxProps): JSX.Element => {
  return (
    <Box py={8}>
      <Container maxWidth="lg">
        <Paper>
          <Box position="relative" px={4} py={4}>
            {children}

            <CloseButton href={RoutesConfig.main.generatePath()} />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
