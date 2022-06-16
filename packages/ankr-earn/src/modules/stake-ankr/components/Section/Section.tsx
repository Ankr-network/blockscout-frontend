import { Box } from '@material-ui/core';
import { ReactNode } from 'react';

import { Container } from 'uiKit/Container';

interface ISectionProps {
  children: ReactNode;
  withContainer?: boolean;
}

export const Section = ({
  children,
  withContainer = true,
}: ISectionProps): JSX.Element => {
  return (
    <Box component="section" py={{ xs: 4, md: 8 }}>
      {withContainer ? <Container>{children}</Container> : children}
    </Box>
  );
};
