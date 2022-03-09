import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { Container } from 'uiKit/Container';

import { Header } from '.';

export default {
  title: 'modules/TradingCockpit/components/Header',
};

export const Default = (): JSX.Element => {
  const formPlaceholder = (
    <Box maxWidth={580}>
      <Skeleton height={60} variant="rect" width="100%" />
    </Box>
  );

  const fairValuePlaceholder = (
    <Skeleton height={60} variant="rect" width={140} />
  );

  return (
    <section>
      <Container>
        <Header
          fairValueSlot={fairValuePlaceholder}
          formSlot={formPlaceholder}
        />
      </Container>
    </section>
  );
};
