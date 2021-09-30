import React from 'react';
import { Box, Container, ThemeProvider } from '@material-ui/core';

import { GoBack } from 'modules/layout/components/GoBack';
import { darkTheme } from 'modules/themes/darkTheme';
import { Section } from 'uiKit/Section';

export const ChainDetails = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Section>
        <Container maxWidth={false}>
          <Box mb={{ xs: 8, md: 12 }}>
            <GoBack />
          </Box>
        </Container>
      </Section>
    </ThemeProvider>
  );
};
