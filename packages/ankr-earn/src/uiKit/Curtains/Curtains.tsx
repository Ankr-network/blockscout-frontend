import { Container, ContainerProps } from '@material-ui/core';
import React from 'react';

export const Curtains = React.forwardRef<
  HTMLElement,
  ContainerProps & { component?: React.ElementType; children: React.ReactNode }
>(({ children, component = 'div', ...props }, ref) => (
  <Container component={component} {...props} ref={ref}>
    {children}
  </Container>
));
