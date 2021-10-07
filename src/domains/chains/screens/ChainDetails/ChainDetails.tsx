import React from 'react';
import { Box, Container, ThemeProvider } from '@material-ui/core';

import { mainTheme } from 'modules/themes/mainTheme';
import { Section } from 'uiKit/Section';

export const ChainDetails = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <Section>
        <Container maxWidth={false}>
          <Box mb={{ xs: 8, md: 12 }} />
        </Container>
      </Section>
    </ThemeProvider>
  );
};
